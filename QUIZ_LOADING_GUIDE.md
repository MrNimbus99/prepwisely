# PrepWisely Quiz Loading Guide

## 📋 Overview

This guide documents the **correct way** to load quiz questions into PrepWisely portal.

---

## 🎯 Critical Information

### Correct Table
- **Table Name:** `prepwisely-questions` (ap-southeast-2)
- **NOT:** `prepwisely-prod-questions` (old/unused table)

### Correct Field Names
```json
{
  "questionId": "uuid-string",           // UUID v4
  "certId": "ai-practitioner",           // NOT "AIF-C01"
  "quizId": "quiz-1",                    // NOT "quiz-01" (no zero padding)
  "questionText": "Question here...",    // NOT "question"
  "options": ["A", "B", "C", "D"],       // Array of strings
  "correctAnswer": 0,                    // Index (0=A, 1=B, etc.) or "0,2" for multiple
  "explanation": "Why correct...",
  "domain": "Domain 1: Fundamentals...",
  "order": 1,                            // Question number in quiz
  "status": "active",
  "createdAt": "2026-02-07T09:00:00.000Z"
}
```

### Certification ID Format
| Certification | certId Value |
|--------------|--------------|
| AWS Cloud Practitioner | `cloud-practitioner` |
| AWS AI Practitioner | `ai-practitioner` |
| Solutions Architect Associate | `solutions-architect-associate` |
| Solutions Architect Professional | `solutions-architect-professional` |

**Pattern:** Use lowercase with hyphens, NOT exam codes (CLF-C02, AIF-C01, etc.)

---

## 🔧 Loading Script

### Location
`/tmp/load_ai_practitioner_quiz.py`

### Usage
```bash
python3 /tmp/load_ai_practitioner_quiz.py /path/to/quiz-01.md
```

### Script Content
```python
import re, boto3, sys, uuid
from datetime import datetime

def parse_and_load(filepath):
    with open(filepath) as f: content = f.read()
    
    # Extract quiz number from filename (quiz-1.md -> 1)
    quiz_num = int(re.search(r'quiz-(\d+)', filepath).group(1))
    domain = re.search(r'Domain:\s*(.+)', content).group(1).strip()
    
    # Split into individual questions
    questions = re.split(r'##\s+Question\s+\d+', content)[1:]
    
    dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-2')
    table = dynamodb.Table('prepwisely-questions')  # CORRECT TABLE
    
    for idx, q_text in enumerate(questions, 1):
        # Parse question text
        q_match = re.search(r'Question Text:\s*(.+?)(?=Answer Options:)', q_text, re.DOTALL)
        question_text = q_match.group(1).strip() if q_match else ""
        
        # Parse options
        opts_match = re.search(r'Answer Options:\s*(.+?)(?=Explanation:)', q_text, re.DOTALL)
        options = re.findall(r'[A-G]\)\s*(.+)', opts_match.group(1)) if opts_match else []
        
        # Parse correct answer
        ans_match = re.search(r'Correct answer:\s*([A-G](?:\s+and\s+[A-G])*)', q_text)
        correct_str = ans_match.group(1).strip() if ans_match else "A"
        
        # Convert answer letter to index (A=0, B=1, etc.)
        if 'and' in correct_str:
            # Multiple choice: "A and C" -> "0,2"
            letters = re.findall(r'[A-G]', correct_str)
            correct_answer = ','.join(str(ord(l) - ord('A')) for l in letters)
        else:
            # Single choice: "B" -> 1
            correct_answer = str(ord(correct_str[0]) - ord('A'))
        
        # Parse explanation
        exp_match = re.search(r'Explanation:\s*Your answer:.*?Correct answer:.*?$(.+)', q_text, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else ""
        
        # Create DynamoDB item
        item = {
            'questionId': str(uuid.uuid4()),
            'certId': 'ai-practitioner',           # CORRECT FORMAT
            'quizId': f'quiz-{quiz_num}',          # NO ZERO PADDING
            'questionText': question_text,         # NOT "question"
            'options': options,
            'correctAnswer': int(correct_answer.split(',')[0]) if ',' not in correct_answer else correct_answer,
            'explanation': explanation,
            'domain': domain,
            'order': idx,
            'status': 'active',
            'createdAt': datetime.utcnow().isoformat() + 'Z'
        }
        
        table.put_item(Item=item)
        print(f"✅ Q{idx}")
    
    print(f"✅ Quiz {quiz_num}: {len(questions)} questions")

parse_and_load(sys.argv[1])
```

---

## ✅ Verification Commands

### Check Quiz Loaded Correctly
```bash
# Count questions in quiz
aws dynamodb scan \
  --table-name prepwisely-questions \
  --region ap-southeast-2 \
  --filter-expression "certId = :cert AND quizId = :quiz" \
  --expression-attribute-values '{":cert":{"S":"ai-practitioner"},":quiz":{"S":"quiz-1"}}' \
  --select COUNT \
  --output json | jq -r '.Count'

# Should return: 20 (for a 20-question quiz)
```

### View Sample Question
```bash
aws dynamodb scan \
  --table-name prepwisely-questions \
  --region ap-southeast-2 \
  --filter-expression "certId = :cert AND quizId = :quiz" \
  --expression-attribute-values '{":cert":{"S":"ai-practitioner"},":quiz":{"S":"quiz-1"}}' \
  --limit 1 \
  --output json | jq '.Items[0]'
```

### Check Portal API
```bash
# This should return questions (if API is configured)
curl -s "https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/ai-practitioner/1" | jq 'length'
```

---

## 🧹 Cleanup Commands

### Remove Incorrectly Loaded Questions
```bash
# If you loaded to wrong table
aws dynamodb scan \
  --table-name prepwisely-prod-questions \
  --region ap-southeast-2 \
  --filter-expression "begins_with(questionId, :prefix)" \
  --expression-attribute-values '{":prefix":{"S":"AIF"}}' \
  --output json | jq -r '.Items[].questionId.S' | while read qid; do
  aws dynamodb delete-item \
    --table-name prepwisely-prod-questions \
    --region ap-southeast-2 \
    --key "{\"questionId\":{\"S\":\"$qid\"}}"
done

# If you used wrong certId format
aws dynamodb scan \
  --table-name prepwisely-questions \
  --region ap-southeast-2 \
  --filter-expression "certId = :cert" \
  --expression-attribute-values '{":cert":{"S":"AIF-C01"}}' \
  --output json | jq -r '.Items[].questionId.S' | while read qid; do
  aws dynamodb delete-item \
    --table-name prepwisely-questions \
    --region ap-southeast-2 \
    --key "{\"questionId\":{\"S\":\"$qid\"}}"
done
```

---

## 📝 Loading Process (Step-by-Step)

### For Each Quiz:

1. **Verify quiz file exists**
   ```bash
   ls /home/althwabt/aws-certs/content/AIF-C01/quiz-01.md
   ```

2. **Load quiz**
   ```bash
   python3 /tmp/load_ai_practitioner_quiz.py /home/althwabt/aws-certs/content/AIF-C01/quiz-01.md
   ```

3. **Verify count**
   ```bash
   aws dynamodb scan \
     --table-name prepwisely-questions \
     --region ap-southeast-2 \
     --filter-expression "certId = :cert AND quizId = :quiz" \
     --expression-attribute-values '{":cert":{"S":"ai-practitioner"},":quiz":{"S":"quiz-1"}}' \
     --select COUNT | jq -r '.Count'
   ```
   Should return: **20**

4. **Check portal**
   - Go to https://nestedcerts.com/
   - Navigate to AWS AI Practitioner
   - Verify Quiz 1 shows "20 Questions"

5. **Repeat for next quiz**

---

## ⚠️ Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `prepwisely-prod-questions` | `prepwisely-questions` |
| `certId: "AIF-C01"` | `certId: "ai-practitioner"` |
| `quizId: "quiz-01"` | `quizId: "quiz-1"` |
| `question: "text"` | `questionText: "text"` |
| `certification: "..."` | `certId: "..."` |
| `quizNumber: 1` (number) | `quizId: "quiz-1"` (string) |

---

## 📊 Current Status

### ✅ ALL CERTIFICATIONS LOADED (100%)

1. ✅ AI Practitioner (AIF-C01) - 600 questions
2. ✅ Generative AI Developer Professional (AIP-C01) - 600 questions 🆕
3. ✅ Cloud Practitioner - 664 questions
4. ✅ Solutions Architect Associate - 36 questions
5. ✅ Solutions Architect Professional - 1540 questions
6. ✅ Developer Associate - 32 questions
7. ✅ SysOps Administrator - 32 questions
8. ✅ DevOps Professional - 32 questions
9. ✅ Data Engineer - 32 questions
10. ✅ ML Engineer Associate - 32 questions
11. ✅ ML Specialty - 32 questions
12. ✅ Database Specialty - 34 questions
13. ✅ Security Specialty - 32 questions
14. ✅ Advanced Networking Professional - 32 questions

### Total Loaded
- **14 certifications**
- **3,732 questions**
- **~186 quizzes**

---

## 🔗 References

- **Portal:** https://nestedcerts.com/
- **API Endpoint:** https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod
- **DynamoDB Table:** prepwisely-questions (ap-southeast-2)
- **Quiz Files:** /home/althwabt/aws-certs/content/AIF-C01/quiz-*.md
- **Lambda Handler:** /home/althwabt/aws-certs/prepwisely/lambda/api-handlers.js

---

## 📞 Quick Reference

**When starting a new session, say:**
> "Load Quiz [N] for AI Practitioner following QUIZ_LOADING_GUIDE.md"

**To verify everything:**
```bash
cat /home/althwabt/aws-certs/prepwisely/QUIZ_LOADING_GUIDE.md
```

---

*Last Updated: 2026-02-08*
*Status: ✅ ALL CERTIFICATIONS LOADED (14/14)*
*Total Questions: 3,732*

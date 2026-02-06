# Quick Reference: Load Quiz

## One Command to Load a Quiz
```bash
python3 /tmp/load_ai_practitioner_quiz.py /home/althwabt/aws-certs/content/AIF-C01/quiz-[N].md
```

## Verify Loaded
```bash
aws dynamodb scan --table-name prepwisely-questions --region ap-southeast-2 \
  --filter-expression "certId = :cert AND quizId = :quiz" \
  --expression-attribute-values '{":cert":{"S":"ai-practitioner"},":quiz":{"S":"quiz-[N]"}}' \
  --select COUNT | jq -r '.Count'
```
Should return: **20**

## Key Facts
- **Table:** `prepwisely-questions` (NOT prepwisely-prod-questions)
- **certId:** `ai-practitioner` (NOT AIF-C01)
- **quizId:** `quiz-1` (NOT quiz-01)
- **Field:** `questionText` (NOT question)

## Full Guide
See: `/home/althwabt/aws-certs/prepwisely/QUIZ_LOADING_GUIDE.md`

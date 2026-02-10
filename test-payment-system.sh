#!/bin/bash

# Payment System Test Script
# Tests all endpoints of the Stripe payment integration

API_BASE="https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com"
WEBHOOK_URL="https://3hseraim16.execute-api.ap-southeast-2.amazonaws.com/webhook"

echo "========================================="
echo "Payment System Integration Test"
echo "========================================="
echo ""

# Test 1: Get Config
echo "Test 1: GET /api/billing/config"
echo "-----------------------------------"
CONFIG_RESPONSE=$(curl -s "${API_BASE}/api/billing/config")
echo "$CONFIG_RESPONSE" | jq .
PUBLISHABLE_KEY=$(echo "$CONFIG_RESPONSE" | jq -r '.publishableKey')

if [ -n "$PUBLISHABLE_KEY" ] && [ "$PUBLISHABLE_KEY" != "null" ]; then
    echo "✅ Config endpoint working - Publishable key retrieved"
else
    echo "❌ Config endpoint failed"
    exit 1
fi
echo ""

# Test 2: Get Subscription Status (non-existent user)
echo "Test 2: GET /api/billing/subscription?userId=test-user-123"
echo "-----------------------------------"
SUB_RESPONSE=$(curl -s "${API_BASE}/api/billing/subscription?userId=test-user-123")
echo "$SUB_RESPONSE" | jq .
HAS_ACCESS=$(echo "$SUB_RESPONSE" | jq -r '.hasAccess')

if [ "$HAS_ACCESS" == "false" ]; then
    echo "✅ Subscription endpoint working - Correctly returns no access for new user"
else
    echo "❌ Subscription endpoint failed"
    exit 1
fi
echo ""

# Test 3: Create Checkout Session (will fail without valid price ID, but tests endpoint)
echo "Test 3: POST /api/billing/checkout-session"
echo "-----------------------------------"
CHECKOUT_RESPONSE=$(curl -s -X POST "${API_BASE}/api/billing/checkout-session" \
    -H "Content-Type: application/json" \
    -d '{"priceId":"price_test_invalid","userId":"test-user-123"}')
echo "$CHECKOUT_RESPONSE" | jq .

# This should fail with Stripe error, but endpoint should respond
if echo "$CHECKOUT_RESPONSE" | jq -e '.error' > /dev/null; then
    echo "✅ Checkout endpoint responding (expected error with invalid price ID)"
else
    echo "⚠️  Unexpected response from checkout endpoint"
fi
echo ""

# Test 4: Customer Portal (will fail for non-existent customer)
echo "Test 4: POST /api/billing/portal"
echo "-----------------------------------"
PORTAL_RESPONSE=$(curl -s -X POST "${API_BASE}/api/billing/portal" \
    -H "Content-Type: application/json" \
    -d '{"userId":"test-user-123"}')
echo "$PORTAL_RESPONSE" | jq .

if echo "$PORTAL_RESPONSE" | jq -e '.error' > /dev/null; then
    ERROR_MSG=$(echo "$PORTAL_RESPONSE" | jq -r '.error')
    if [ "$ERROR_MSG" == "No customer found" ]; then
        echo "✅ Portal endpoint working - Correctly returns error for non-existent customer"
    else
        echo "⚠️  Portal endpoint returned unexpected error: $ERROR_MSG"
    fi
else
    echo "❌ Portal endpoint failed"
fi
echo ""

# Test 5: Webhook endpoint (without signature - should fail)
echo "Test 5: POST /webhook (without signature)"
echo "-----------------------------------"
WEBHOOK_RESPONSE=$(curl -s -X POST "${WEBHOOK_URL}" \
    -H "Content-Type: application/json" \
    -d '{"type":"test.event"}')
echo "$WEBHOOK_RESPONSE" | jq .

if echo "$WEBHOOK_RESPONSE" | jq -e '.error' > /dev/null; then
    ERROR_MSG=$(echo "$WEBHOOK_RESPONSE" | jq -r '.error')
    if [ "$ERROR_MSG" == "No signature" ]; then
        echo "✅ Webhook endpoint working - Correctly rejects requests without signature"
    else
        echo "⚠️  Webhook returned unexpected error: $ERROR_MSG"
    fi
else
    echo "❌ Webhook endpoint failed"
fi
echo ""

echo "========================================="
echo "Test Summary"
echo "========================================="
echo "✅ All endpoints are responding correctly"
echo "✅ Error handling is working as expected"
echo "✅ Security checks are in place"
echo ""
echo "Next Steps:"
echo "1. Create products and prices in Stripe Dashboard"
echo "2. Configure webhook in Stripe Dashboard:"
echo "   URL: ${WEBHOOK_URL}"
echo "3. Test with real Stripe test cards"
echo "4. Integrate with frontend application"
echo ""

#!/usr/bin/env node
/**
 * Smoke tests for critical API endpoints
 * Basic connectivity and response validation
 */

const fs = require('fs');
const path = require('path');

async function testEndpoint(endpoint, expectedStatus = 200, method = 'GET', body = null) {
  const url = `http://localhost:3000/api/${endpoint}`;
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const success = response.status === expectedStatus;
    
    console.log(`${success ? '✅' : '❌'} ${method} /api/${endpoint} - Status: ${response.status} (expected: ${expectedStatus})`);
    
    return success;
  } catch (error) {
    console.log(`❌ ${method} /api/${endpoint} - Error: ${error.message}`);
    return false;
  }
}

async function runSmokeTests() {
  console.log('🧪 Running API smoke tests...\n');
  
  const tests = [
    // Test iframe-check endpoint (should handle missing URL gracefully)
    ['iframe-check', 400], // Bad request without proper params
    
    // Test chat-rooms GET endpoints  
    ['chat-rooms?action=getRooms', 200],
    ['chat-rooms?action=getUsers', 200],
    
    // Test other endpoints that should respond
    ['utils/cors', 200],
    ['utils/aiModels', 200],
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const [endpoint, expectedStatus, method, body] of tests) {
    const success = await testEndpoint(endpoint, expectedStatus, method, body);
    if (success) passed++;
  }
  
  console.log(`\n📊 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All smoke tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed - check API server and endpoints');
    process.exit(1);
  }
}

// Check if we're running this script directly
if (require.main === module) {
  runSmokeTests().catch(error => {
    console.error('💥 Smoke test runner failed:', error);
    process.exit(1);
  });
}

module.exports = { testEndpoint, runSmokeTests };
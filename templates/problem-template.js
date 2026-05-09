/**
 * NeetCode 150 - JavaScript Problem Template
 * Run: node solution.js
 */

class Solution {
    // TODO: Implement your solution here
    
}

// ==================== TEST HARNESS ====================

function runTest(testName, actual, expected) {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`Test (${testName}): ${pass ? 'PASS' : 'FAIL'}`);
    if (!pass) {
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Actual:   ${JSON.stringify(actual)}`);
    }
    return pass;
}

function main() {
    const sol = new Solution();
    let allPassed = true;

    // Example usage (replace with actual problem tests):
    // allPassed = runTest("Example 1", sol.yourMethod([1, 2, 3]), 6) && allPassed;
    // allPassed = runTest("Example 2", sol.yourMethod([]), 0) && allPassed;

    console.log(allPassed ? "\nAll tests passed!" : "\nSome tests failed.");
    process.exit(allPassed ? 0 : 1);
}

main();

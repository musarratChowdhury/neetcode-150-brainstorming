/**
 * NeetCode 150 - Problem 1: Contains Duplicate
 * Compile: g++ -std=c++17 -o contains-duplicate contains-duplicate.cpp
 * Run: ./contains-duplicate
 */

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;

        for(int num : nums) {
            if(seen.count(num) > 0)return true;
            seen.insert(num);
        }
        return false;
    }
};

// ==================== TEST HARNESS ====================

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    Solution sol;
    bool allPassed = true;
    int testNum = 0;

    auto runTest = [&](const string& testName, vector<int> nums, bool expected) {
        testNum++;
        bool actual = sol.containsDuplicate(nums);
        bool pass = (actual == expected);
        if (!pass) allPassed = false;
        cout << "Test " << testNum << " (" << testName << "): "
             << (pass ? "PASS" : "FAIL") << endl;
        if (!pass) {
            cout << "  Expected: " << (expected ? "true" : "false") << endl;
            cout << "  Actual:   " << (actual ? "true" : "false") << endl;
        }
    };

    runTest("Example 1 - has duplicate", {1, 2, 3, 1}, true);
    runTest("Example 2 - all unique", {1, 2, 3, 4}, false);
    runTest("Example 3 - multiple duplicates", {1, 1, 1, 3, 3, 4, 3, 2, 4, 2}, true);
    runTest("Edge - empty array", {}, false);
    runTest("Edge - single element", {42}, false);
    runTest("Edge - two same elements", {5, 5}, true);
    runTest("Edge - large numbers", {INT_MAX, INT_MIN, INT_MAX}, true);

    cout << (allPassed ? "\nAll tests passed!" : "\nSome tests failed.") << endl;
    return allPassed ? 0 : 1;
}

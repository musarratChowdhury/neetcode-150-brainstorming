/**
 * NeetCode 150 - Problem 2: Valid Anagram
 * Compile: g++ -std=c++17 -o valid-anagram valid-anagram.cpp
 * Run: ./valid-anagram
 */

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        // TODO: Implement your solution here
        //
        if(s.length() != t.length()) return false;
        unordered_map<char,int> freq;
        for(char c : s){
            freq[c]++;
        }
        for(char c : t){
            freq[c]--;
        }

        for(const auto& pair:freq){
            if(pair.second!=0) return false;
        }

        return true;
    }
};

// ==================== TEST HARNESS ====================

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    Solution sol;
    bool allPassed = true;
    int testNum = 0;

    auto runTest = [&](const string& testName, string s, string t, bool expected) {
        testNum++;
        bool actual = sol.isAnagram(s, t);
        bool pass = (actual == expected);
        if (!pass) allPassed = false;
        cout << "Test " << testNum << " (" << testName << "): "
             << (pass ? "PASS" : "FAIL") << endl;
        if (!pass) {
            cout << "  s: \"" << s << "\", t: \"" << t << "\"" << endl;
            cout << "  Expected: " << (expected ? "true" : "false") << endl;
            cout << "  Actual:   " << (actual ? "true" : "false") << endl;
        }
    };

    runTest("Example 1 - valid anagram", "anagram", "nagaram", true);
    runTest("Example 2 - not anagram", "rat", "car", false);
    runTest("Edge - empty strings", "", "", true);
    runTest("Edge - different lengths", "abc", "abcd", false);
    runTest("Edge - same letters different counts", "aabb", "abab", true);
    runTest("Edge - unicode-like chars", "listen", "silent", true);
    runTest("Edge - single char same", "a", "a", true);
    runTest("Edge - single char different", "a", "b", false);

    cout << (allPassed ? "\nAll tests passed!" : "\nSome tests failed.") << endl;
    return allPassed ? 0 : 1;
}

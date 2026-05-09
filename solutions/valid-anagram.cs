/**
 * NeetCode 150 - Problem 2: Valid Anagram (C#)
 * Run: dotnet run valid-anagram.cs
 * Or: csc valid-anagram.cs && mono valid-anagram.exe
 */

using System;
using System.Collections.Generic;

public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) return false;
        
        int[] count = new int[26];
        
        for (int i = 0; i < s.Length; i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        
        foreach (int c in count) {
            if (c != 0) return false;
        }
        
        return true;
    }
}

// ==================== TEST HARNESS ====================

public class Program {
    private static int testNum = 0;
    private static bool allPassed = true;

    private static void RunTest(string testName, string s, string t, bool expected) {
        testNum++;
        Solution sol = new Solution();
        bool actual = sol.IsAnagram(s, t);
        bool pass = (actual == expected);
        if (!pass) allPassed = false;

        Console.WriteLine($"Test {testNum} ({testName}): {(pass ? "PASS" : "FAIL")}");
        if (!pass) {
            Console.WriteLine($"  s: \"{s}\", t: \"{t}\"");
            Console.WriteLine($"  Expected: {expected}");
            Console.WriteLine($"  Actual:   {actual}");
        }
    }

    public static void Main(string[] args) {
        RunTest("Example 1 - valid anagram", "anagram", "nagaram", true);
        RunTest("Example 2 - not anagram", "rat", "car", false);
        RunTest("Edge - empty strings", "", "", true);
        RunTest("Edge - different lengths", "abc", "abcd", false);
        RunTest("Edge - same letters different counts", "aabb", "abab", true);
        RunTest("Edge - listen/silent", "listen", "silent", true);
        RunTest("Edge - single char same", "a", "a", true);
        RunTest("Edge - single char different", "a", "b", false);

        Console.WriteLine(allPassed ? "\nAll tests passed!" : "\nSome tests failed.");
        Environment.Exit(allPassed ? 0 : 1);
    }
}

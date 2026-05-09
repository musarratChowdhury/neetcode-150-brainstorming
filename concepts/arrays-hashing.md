# Arrays & Hashing — Concept Deep-Dive

## The Core Pattern

When a problem asks you to:
- Check if something **exists**
- Count **occurrences**
- Group by a **property**
- Find **duplicates** or **uniques**

...your first thought should be: **Can I use a hash map or hash set?**

### Why Hashing is So Powerful

Arrays give you O(1) access by index. Hash maps extend that idea: **O(1) access by key.**

In an interview, the jump from "I need to find if X exists" to "I'll use a hash set" should be almost automatic. The real skill is recognizing *when* hashing applies and *what* to hash.

---

## Key Data Structures

### 1. Hash Set (`unordered_set` in C++, `Set` in JS)
- Use for: existence checks, deduplication
- Example: "Have I seen this number before?"

### 2. Hash Map (`unordered_map` in C++, `Map`/`Object` in JS)
- Use for: frequency counting, mapping one thing to another
- Example: "How many times does each character appear?"

### 3. Array as a Frequency Counter
- When keys are bounded integers (e.g., lowercase letters = 26, ASCII = 128/256)
- Faster than hash maps due to cache locality and no hashing overhead
- Example: Counting characters in a string — use `int count[26]` instead of a map

---

## Recognition Guide

| Problem Phrase | Likely Approach |
|---------------|-----------------|
| "Find duplicates" | Hash set |
| "Count frequency" | Hash map or array counter |
| "Group by..." | Hash map where key = grouping property |
| "Two sum" | Hash map: value -> index |
| "Anagram" | Frequency counter comparison |
| "Top K frequent" | Hash map + heap / bucket sort |

---

## Common Pitfalls

1. **Assuming you need to sort.** Sorting is O(n log n). Hashing is often O(n). Ask: "Do I actually need order?"

2. **Using the wrong key.** In "Group Anagrams," the key isn't the string itself — it's the sorted string or the frequency signature.

3. **Forgetting about space complexity.** Hash maps use O(n) space. Sometimes the interviewer asks: "Can you do this with O(1) extra space?" (e.g., Product of Array Except Self)

4. **Not leveraging array counters.** If your key space is small and fixed, an array beats a hash map every time.

---

## Interview Follow-ups

**Q: What if memory is extremely limited?**
- Use sorting (O(1) extra space if in-place) at the cost of O(n log n) time.
- For strings, use bit manipulation if alphabet is small.

**Q: What if the input is a stream?**
- Hashing still works — you process elements one by one.
- For top-k problems, maintain a heap of size k instead of a full frequency map.

**Q: How do hash maps actually work?**
- Hash function -> bucket index -> handle collisions with chaining or open addressing.
- C++ `unordered_map` uses chaining. Average O(1), worst case O(n) if all keys collide.
- Know this for system design / low-level interviews.

---

## Time & Space Complexity Cheat Sheet

| Approach | Time | Space | When to Use |
|----------|------|-------|-------------|
| Brute force (nested loops) | O(n^2) | O(1) | Never in optimal solution |
| Sorting | O(n log n) | O(1) or O(n) | When order matters, memory is tight |
| Hash set/map | O(n) avg | O(n) | Default for existence/frequency |
| Array counter | O(n) | O(k) where k = key space | Keys are bounded integers |

---

## Problems in This Category (NeetCode 150)

1. Contains Duplicate
2. Valid Anagram
3. Two Sum
4. Group Anagrams
5. Top K Frequent Elements
6. Product of Array Except Self
7. Valid Sudoku
8. Encode and Decode Strings
9. Longest Consecutive Sequence

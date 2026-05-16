# VJudge Contest 811319 — Problem D: Dynamic Floyd-Warshall

Full simulation trace for sample input 2.

## Input

```
3
0 4 5
4 0 9
5 9 0
2
2 3 8
1 2 1
```

---

## Initial State

```
dist = [0, 4, 5]
       [4, 0, 9]
       [5, 9, 0]
```

Unordered pairs: `dist[0][1] = 4`, `dist[0][2] = 5`, `dist[1][2] = 9`

Sum = 4 + 5 + 9 = **18**

---

## Road 1: `2 3 8` (a=1, b=2, c=8 in 0-based)

**Step 1 — Update direct edge:**
`dist[1][2] = 9 > 8` → reduce to 8

```
dist[1][2] = dist[2][1] = 8
```

**Step 2 — Propagate via new edge `(1, 2, 8)`:**

For every `(i, j)`, check:
- `dist[i][j] = min(dist[i][j], dist[i][1] + 8 + dist[2][j])`  (via a→b)
- `dist[i][j] = min(dist[i][j], dist[i][2] + 8 + dist[1][j])`  (via b→a)

| (i,j) | old | via i→1→2→j  | via i→2→1→j  | new |
|-------|-----|-------------|-------------|-----|
| (0,1) | 4   | 4+8+8 = 20  | 5+8+0 = 13  | **4** |
| (0,2) | 5   | 4+8+0 = 12  | 5+8+8 = 21  | **5** |
| (1,2) | 8   | 0+8+0 = 8   | 8+8+8 = 24  | **8** |

No improvements.

**Matrix after road 1:**
```
dist = [0, 4, 5]
       [4, 0, 8]
       [5, 8, 0]
```

Sum = 4 + 5 + 8 = **17**  ← first output

---

## Road 2: `1 2 1` (a=0, b=1, c=1 in 0-based)

**Step 1 — Update direct edge:**
`dist[0][1] = 4 > 1` → reduce to 1

```
dist[0][1] = dist[1][0] = 1
```

**Step 2 — Propagate via new edge `(0, 1, 1)`:**

For every `(i, j)`, check:
- `dist[i][j] = min(dist[i][j], dist[i][0] + 1 + dist[1][j])`  (via a→b)
- `dist[i][j] = min(dist[i][j], dist[i][1] + 1 + dist[0][j])`  (via b→a)

| (i,j) | old | via i→0→1→j  | via i→1→0→j  | new |
|-------|-----|-------------|-------------|-----|
| (0,1) | 1   | 0+1+0 = 1   | 1+1+1 = 3   | **1** |
| (0,2) | 5   | 0+1+8 = 9   | 1+1+5 = 7   | **5** |
| (1,2) | 8   | 1+1+8 = 10  | **0+1+5 = 6** ✅ | **6** |
| (2,1) | 8   | **5+1+0 = 6** ✅ | 6+1+1 = 8   | **6** |

`dist[1][2]` improves from 8 → 6!

**Final matrix after road 2:**
```
dist = [0, 1, 5]
       [1, 0, 6]
       [5, 6, 0]
```

Sum = 1 + 5 + 6 = **12**  ← second output

---

## Final Output

```
17 12
```

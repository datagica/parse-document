# Datagica Parse Document

Generic document parser



Graph schema:

```text
|
|
|   { coord }                     { }
|      |                           |
*—<mention>*-—>(single entity)*-—> <instanceof>*—> (type)
|                    *
|                    |
|              < xxx action >—- {}
|     { }            *                  { }
|      |            \|/                  |
*—-<mention>*-—> (single entity) *-→ <instanceof>*→ (type)
|
|
|
|
```

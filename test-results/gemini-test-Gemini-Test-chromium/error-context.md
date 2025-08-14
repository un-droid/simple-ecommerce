# Page snapshot

```yaml
- banner:
  - link "simple shop":
    - /url: /
  - link "cart 1":
    - /url: /cart
- navigation "breadcrumbs":
  - list:
    - listitem:
      - link "home":
        - /url: /
    - listitem: cart
- list:
  - listitem:
    - img "classic tee"
    - text: classic tee $19.99
    - button "-"
    - spinbutton: "1"
    - button "+"
    - text: $19.99
- text: subtotal $19.99
- button "clear cart"
- link "checkout":
  - /url: /checkout
- alert
```
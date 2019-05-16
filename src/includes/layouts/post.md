---
layout: /layouts/base.njk
---
Posted on {{ page.date | date('do of MMMM, YYYY') }}

## {{ title }}

{{ content | safe }}

---

[View all posts](/blog/)
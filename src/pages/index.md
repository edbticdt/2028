---
title: Home
menu_label: Home
description: The 2028 EDBT/ICDT Joint Conference, held in Aarhus, Denmark.
---

{%- set edbtPrevious = history.edbt_only.concat(history.joint) -%}
{%- set icdtPrevious = history.icdt_only.concat(history.joint) -%}

{% include "partials/cover.njk" %}

Welcome to the home of the {{ site.year }} EDBT/ICDT Joint Conference, to be
held in {{ site.city }}, {{ site.country }}. Dates: {{ site.dates | lower }}.

## EDBT: {{ (edbtPrevious.length + 1) | ordinal }} International Conference on Extending Database Technology

The EDBT series of conferences is an established and prestigious forum for the
exchange of the latest research results in data management. Held in an
attractive European location, the conference provides unique opportunities
for database researchers, practitioners, developers, and users to explore new
ideas, techniques, and tools, and to exchange experiences.

The previous EDBT conferences were held in {{ edbtPrevious | listJoin }}.

## ICDT: {{ (icdtPrevious.length + 1) | ordinal }} International Conference on Database Theory

ICDT is an established and prestigious series of international conferences on
research in the foundations and theory of data management.

The previous ICDT conferences were held in {{ icdtPrevious | listJoin }}.

Since 2009, ICDT has been held every year jointly with EDBT, following the
successful SIGMOD/PODS model.

# 10 Django Request Lifecycle

This section summarizes Django’s request–response lifecycle and highlights where caching may affect perceived behavior.

## Overview
- Client sends an HTTP request.
- URL routing matches the request to a view.
- Middleware may process before/after the view.
- View executes, interacts with the database and templates.
- Response returns through middleware to the client.

Reference diagram (as in the original note):
- https://gitee.com/aini0424/cssn_images/raw/master/image-20230926190459965.png

## Caching Notes
- Caches can store precomputed results to improve response time.
- After data changes, you might not see updates immediately due to cached content.
- Use Django’s cache framework appropriately and set sensible invalidation policies.
https://imabhishek476.github.io/Zomato-afterOrderProcess/
Use three buttons step by step and check console -- use like a backend


#### Zomato-afterOrderProcess
Just use this steps to bulid the logics using Promises only
Before Order:-
1. Users add/remove Items into cart->
2. Checkout cart -> Generate bill ->
3. Apply Coupon -> Select address + Payment way
4. Complete Payment and place Order

##After Order:-
1. Order sent to Restaurant -> Waiting for Restaurant Order Acceptance
2. Restaurant accepts -> Start preparing
3. Restaurant rejects -> Return Payment
4. Start preparing -> Search for Nearby delivery agents
5. Assign a delivery agents with delivery paths and less Distance

6. Check have picked up after Every 1 min -> Pickup Order from Restaurant ->
7. If not picked up -> Update Estimated Time
8. If Picked up -> Get Estimated Order delivery time from map -> Update time
9. Update Delivery Location and Time after Every 1 min to show current Location
10. Order Delivered -> Give Feedback + rating

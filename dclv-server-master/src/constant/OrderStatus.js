/* 
1. When create order, status defaut is pending
2. After having full of fabric roll, change to ready
3. When create sub-order to ship, change status to in-progress and status default of sub-order is ready
4. Sub-order ready -> in_transit. If transit success. Change to completed, or cancel if failed.
5. If status sub-order is completed -> change order staus to completed and vice versa.
 */
module.exports = {
  OrderStatus: {
    PENDING: "pending",
    READY: "ready",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
    CANCELED: "canceled",
  },

  SubOrderStatus: {
    READY: "ready",
    IN_TRANSIT: "in-transit",
    COMPLETED: "completed",
    CANCELED: "canceled",
  },
};

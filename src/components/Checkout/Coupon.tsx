"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, removeCoupon } from "@/redux/features/checkout-slice";
import { RootState } from "@/redux/store";

const Coupon = () => {
  const dispatch = useDispatch();
  const { subtotal, coupon, discount } = useSelector(
    (state: RootState) => state.checkoutReducer
  );

  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!inputCode) return;

    setLoading(true);
    try {
      const username = "admin";
        const appPassword = "SA0Y2M849pllyAxOYRuuyQyU";

        const auth = "Basic " + btoa(`${username}:${appPassword}`);
      const res = await fetch(`http://localhost/next-woo-backend/wp-json/wc/v3/coupons?code=${inputCode}`, {
        headers: {
              Authorization: auth,
            },
      });

      const data = await res.json();

      if (data.length > 0) {
        const couponData = data[0];
        const type = couponData.discount_type; // "percent" | "fixed_cart"
        const amount = Number(couponData.amount);

        let discountAmount = 0;
        if (type === "percent") {
          discountAmount = (subtotal * amount) / 100;
        } else if (type === "fixed_cart") {
          discountAmount = amount;
        }

        // prevent negative total
        if (discountAmount > subtotal) discountAmount = subtotal;

        dispatch(applyCoupon({ code: inputCode, discount: discountAmount }));
      } else {
        alert("❌ Invalid coupon code");
      }
    } catch (err) {
      console.error("Coupon validation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Have any Coupon Code?</h3>
      </div>

      <div className="py-8 px-4 sm:px-8.5">
        <div className="flex gap-4">
          <input
            type="text"
            name="coupon"
            id="coupon"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter coupon code"
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />

          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={loading}
            className="inline-flex font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50"
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>

        {coupon && (
          <div className="mt-4 text-green-600">
            ✅ Coupon <b>{coupon}</b> applied. Discount: ₹{discount}
            <button
              onClick={() => dispatch(removeCoupon())}
              className="ml-3 text-red-500 underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;

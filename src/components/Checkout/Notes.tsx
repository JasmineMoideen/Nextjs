import React from "react";
import { useAppDispatch } from "@/redux/store";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateNotes } from "@/redux/features/checkout-slice";

const Notes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.checkoutReducer.notes);
  return (
    <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
      <div>
        <label htmlFor="notes" className="block mb-2.5">
          Other Notes (optional)
        </label>

        <textarea
          name="notes"
          id="notes"
          rows={5}
          placeholder="Notes about your order, e.g. speacial notes for delivery."
          value={notes}
          onChange={(e) =>
           dispatch(updateNotes(e.target.value))


          }
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        ></textarea>
      </div>
    </div>
  );
};

export default Notes;

import React from "react";

import Dashboard from "../../../components/Dashboard";
import withStudent from "../../../components/withStudent";
import { useGetPaymentQuery } from "../../../state/services/paymentApi";
import { Head, Loader, MaterialTable, withAuth } from "../../../components";
import { useUser } from "../../../hooks/useUser";

const index = () => {
  const { id } = useUser();

  const {
    isLoading,
    isFetching,
    data: payment,
  } = useGetPaymentQuery({
    studentId: id,
  });

  const studentPayment = payment?.map((item) => {
    return {
      batch: item.batch,
      id: item.studentId,
      amount: item.amount,
      courseId: item.courseId,
      discount: item.discount,
      name: item.name,
      comment: item.comment,
      due: item.due,
      installmentAmount: item.installmentAmount,
      installmentNo: item.installmentNo,
      paidAmount: item.paidAmount,
      paymentDate: item.createdAt
    };
  });

  return (
    <Loader active={isLoading || isFetching}>
      <Head title="Student payment" hasMaterialTable={undefined} />
      <Dashboard>
        <div className="space-y-4 text-white">
          <h5>Payments</h5>
          {studentPayment ?studentPayment?.map((item) => (
            <div className="grid max-w-sm grid-cols-2 gap-4 p-4 bg-gray-700 rounded" key={item.id}>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Student Name</div>
                <div className="text-sm">{item.name}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Batch</div>
                <div className="text-sm">{item.batch}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Discount</div>
                <div className="text-sm">{item.discount}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Due</div>
                <div className="text-sm">{item.due}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Installment No</div>
                <div className="text-sm">{item.installmentNo}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Installment Amount</div>

                <div className="text-sm">{item.installmentAmount}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Paid Amount</div>
                <div className="text-sm">{item.paidAmount}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Comment</div>
                <div className="text-sm">{item.comment}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">Payment Date</div>
                <div className="text-sm">{new Date(item.paymentDate).toDateString()}</div>
              </div>
            </div>
          )):<div>No payment data available.</div>}

          {/* <MaterialTable
              title="Students"
              columns={[
                { title: "Batch", field: "batch" },
                { title: "Student Id", field: "id" },
                { title: "Amount", field: "amount" },
                { title: "Course Id", field: "courseId" },
                { title: "Discount", field: "discount" },
                { title: "Name", field: "name" },
                { title: "Comment", field: "comment" },
                { title: "Due", field: "due" },
                { title: "Installment Amount", field: "installmentAmount" },
                { title: "Installment No", field: "installmentNo" },
                { title: "Paid Amount", field: "paidAmount" },
              ]}
              data={studentPayment}
            /> */}
        </div>
      </Dashboard>
    </Loader>
  );
};

export default withStudent(withAuth(index));

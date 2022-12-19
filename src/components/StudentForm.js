import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
  InputLabel,
  Divider,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
} from "@material-ui/core";
import { format } from "date-fns";

const StudentForm = ({ control, handleSubmit, onSubmit, errors, packagePrice, payments }) => {
  const paymentData = payments
    ?.map((item) => ({
      installmentNo: item.installmentNo,
      amount: item.installmentAmount,
      datetime: format(new Date(item.updatedAt), "dd / MM / yyyy"),
      paidAmount: item.paidAmount,
      due: item.due,
      
      discount: item.discount || "0",
      remarks: item.comment,
    }))
    .sort((a, b) => a.installmentNo - b.installmentNo);

  return (
    <form
      className="space-y-6 rounded-md bg-primary-200 p-6 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="batch"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Batch No."
            error={errors?.batch}
            helperText={errors?.batch?.message}
            fullWidth
            {...field}
          />
        )}
      />
      <div className="flex items-center gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Full Name"
            error={errors?.name}
            helperText={errors?.name?.message}
            fullWidth
            {...field}
          />
        )}
        
      />
      <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              error={errors?.email}
              helperText={errors?.email?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Mobile No."
              error={errors?.mobile}
              helperText={errors?.mobile?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="passingYear"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Passing Year"
              error={errors?.email}
              helperText={errors?.email?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="City"
              error={errors?.city}
              helperText={errors?.city?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="university"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="University"
              error={errors?.university}
              helperText={errors?.university?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <Controller
        name="profession"
        control={control}
        render={({ field }) => (
          <Select
            variant="outlined"
            label="Profession"
            error={errors?.profession}
            helperText={errors?.profession?.message}
            value={field.name}
            fullWidth
            {...field}
          >
            <MenuItem value={"Fresh Graduate"}>Fresh Graduate</MenuItem>
            <MenuItem value={"Student"}>Student</MenuItem>
            <MenuItem value={"Job Holder"}>Job Holder</MenuItem>
          </Select>
        )}
      />
      <div className="flex items-center gap-4">
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Company"
              error={errors?.company}
              helperText={errors?.company?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Experience"
              error={errors?.experience}
              helperText={errors?.experience?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div>

      <div className="flex items-center gap-3">
        <Controller
          name="isEnrolled"
          control={control}
          render={({ field }) => <Checkbox color="primary" checked={field.value} {...field} />}
        />
        <InputLabel>Is Enrolled</InputLabel>
      </div>
      <div className="flex items-center gap-3">
        <Controller
          name="isValid"
          control={control}
          render={({ field }) => <Checkbox color="primary" checked={field.value} {...field} />}
        />
        <InputLabel>Is Valid</InputLabel>
      </div>

      <Divider />
      <InputLabel className="text-slate-900">Payment</InputLabel>

      {/* <Controller
        name="courseFee"
        control={control}
        render={({ field }) => (
          <TextField variant="outlined" label="Course Fee" disabled fullWidth {...field} />
        )}
      /> */}

      {/* <div className="flex items-center gap-4">
        <Controller
          name="installment1"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Installment 1"
              error={errors?.installment1}
              helperText={errors?.installment1?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="discount1"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Discount"
              error={errors?.discount1}
              helperText={errors?.discount1?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="installmentComment1"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Comment"
              error={errors?.installmentComment1}
              helperText={errors?.installmentComment1?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="installment2"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Installment 2"
              error={errors?.installment2}
              helperText={errors?.installment2?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="discount2"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Discount"
              error={errors?.discount2}
              helperText={errors?.discount2?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="installmentComment2"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Comment"
              error={errors?.installmentComment2}
              helperText={errors?.installmentComment2?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="installment3"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Installment 3"
              error={errors?.installment3}
              helperText={errors?.installment3?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="discount3"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Discount"
              error={errors?.discount3}
              helperText={errors?.discount3?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="installmentComment3"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Comment"
              error={errors?.installmentComment3}
              helperText={errors?.installmentComment3?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div> */}

      <Divider />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Installment</TableCell>
              <TableCell align="center" className="font-bold">
                Installment Amount
              </TableCell>
              <TableCell align="center" className="font-bold">
                Datetime
              </TableCell>
              <TableCell align="center" className="font-bold">
                Paid Amount
              </TableCell>
              <TableCell align="center" className="font-bold">
                Due
              </TableCell>
              <TableCell align="center" className="font-bold">
                Discount
              </TableCell>
              <TableCell align="right" className="font-bold">
                Remarks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.installmentNo}
                </TableCell>
                <TableCell align="center">{item.amount}</TableCell>
                <TableCell align="center">{item.datetime}</TableCell>
                <TableCell align="center">{item.paidAmount}</TableCell>
                <TableCell align="center">{item.due}</TableCell>
                <TableCell align="center">{item.discount}</TableCell>
                <TableCell align="right">{item.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              {/* <TableCell align="center" className="font-bold">
                Total Installment
              </TableCell> */}
              <TableCell align="center" className="font-bold">
                {paymentData?.reduce((sum, item) => sum + item.amount, 0)}
              </TableCell>
              <TableCell align="center" className="font-bold">
                {/* Total Paid */}
              </TableCell>
              <TableCell align="center" className="font-bold">
                {paymentData?.reduce((sum, item) => sum + item.paidAmount, 0)}
              </TableCell>
              {/* <TableCell align="center" className="font-bold">
                Due Amount
              </TableCell> */}
              <TableCell align="right" className="font-bold">
                {paymentData?.reduce((sum, item) => sum + item.due, 0)}
              </TableCell>
              <TableCell align="center" className="font-bold">
                Total Due
              </TableCell>
              <TableCell align="right" className="font-bold">
                {packagePrice  - paymentData?.reduce((sum, item) => sum + item.paidAmount, 0) + paymentData?.reduce((sum, item) => sum + item.due, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <div className="flex justify-center">
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;

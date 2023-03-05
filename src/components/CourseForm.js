import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  Checkbox,
  InputLabel,
  IconButton,
  Divider,
} from "@material-ui/core";
import { MdAdd, MdRemove } from "react-icons/md";
import { days } from "../variables";

const CourseForm = ({
  control,
  handleSubmit,
  onSubmit,
  setFileName,
  fileName,
  errors,
  // videosField,
  // videosAppend,
  // videosRemove,
  // pptsField,
  // pptsAppend,
  // pptsRemove,
  // pdfsField,
  // pdfsAppend,
  // pdfsRemove,
  // packageField,
  // packageAppend,
  // packageRemove,
}) => {
  
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
      <Controller
        name="courseTitle"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Course Title"
            error={errors?.courseTitle}
            helperText={errors?.courseTitle?.message}
            fullWidth
            {...field}
          />
        )}
      />
      <Controller
        name="courseInitial"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Course Initial"
            error={errors?.courseTitle}
            helperText={errors?.courseTitle?.message}
            fullWidth
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Short Description"
            minRows={4}
            multiline
            fullWidth
            error={errors?.description}
            helperText={errors?.description?.message}
            {...field}
          />
        )}
      />
      <div className="flex items-center gap-3 ">
        <InputLabel>Is Enabled</InputLabel>
        <Controller
          name="isEnabled"
          control={control}
          render={({ field }) => <Checkbox color="primary" checked={field.value} {...field} />}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="enrollmentStartDate"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Enrollment Start Date"
              type="date"
              error={errors?.enrollmentStartDate}
              helperText={errors?.enrollmentStartDate?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="enrollmentEndDate"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Enrollment End Date"
              type="date"
              error={errors?.enrollmentEndDate}
              helperText={errors?.enrollmentEndDate?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="orientationDate"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Orientation Date"
              type="date"
              error={errors?.orientationDate}
              helperText={errors?.orientationDate?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="classStartDate"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Class Start Date"
              type="date"
              error={errors?.classStartDate}
              helperText={errors?.classStartDate?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="classDays"
          control={control}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Class Days"
              SelectProps={{ multiple: true }}
              error={errors?.classDays}
              helperText={errors?.classDays?.message}
              {...field}
            >
              {days.map((day, index) => (
                <MenuItem key={index} value={day}>
                  {day}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="classTime"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              type="time"
              label="Class Time"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <Controller
          name="image"
          control={control}
          rules={{ required: "Please select an image file" }}
          render={({ field: { onChange } }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                onChange(e.target.files[0]);
                setFileName(e.target.files[0]?.name || "");
              }}
            />
          )}
        />
        <p>Selected file: {fileName}</p>
        <Controller
          name="video"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Youtube 11 digit Video ID"
              fullWidth
              error={errors?.video}
              helperText={errors?.video?.message}
              {...field}
            />
          )}
        />
      </div>
      <Divider />
      {/* <InputLabel className="font-bold">Package 1</InputLabel>
      <Controller
        name="package1"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Package name"
            error={errors?.package1}
            helperText={errors?.package1?.message}
            fullWidth
            {...field}
          />
        )}
      />
      <div className="flex items-center gap-4">
        <Controller
          name="courseFeeStudent1"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Course Fee (Student)"
              error={errors?.courseFeeStudent1}
              helperText={errors?.courseFeeStudent1?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="courseFeeJobHolder1"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Course Fee (Job Holder)"
              error={errors?.courseFeeJobHolder1}
              helperText={errors?.courseFeeJobHolder1?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div> */}
      {/* <InputLabel className="font-bold">Package 2</InputLabel>
      <Controller
        name="package2"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Package name"
            error={errors?.package2}
            helperText={errors?.package2?.message}
            fullWidth
            {...field}
          />
        )}
      />
      <div className="flex items-center gap-4">
        <Controller
          name="courseFeeStudent2"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Course Fee (Student)"
              error={errors?.courseFeeStudent2}
              helperText={errors?.courseFeeStudent2?.message}
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="courseFeeJobHolder2"
          control={control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Course Fee (Job Holder)"
              error={errors?.courseFeeJobHolder2}
              helperText={errors?.courseFeeJobHolder2?.message}
              fullWidth
              {...field}
            />
          )}
        />
      </div> */}

      {/* <ul className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <IconButton onClick={() => packageAppend({ package: "", student: "", jobHolder: "" })}>
            <MdAdd />
          </IconButton>
        </div>
        <div className="flex flex-col gap-4">
          {packageField?.map((item, index) => (
            <div key={item.id}>
              <InputLabel className="mb-6 font-bold">Package {index + 1}</InputLabel>
              <Controller
                name={`resourcePackages[${index}].package`}
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Package name"
                    error={errors?.resourcePackages}
                    helperText={errors?.resourcePackages?.[index]?.package.message}
                    fullWidth
                    {...field}
                  />
                )}
              />

              <div className="mt-5 flex items-center gap-4">
                <Controller
                  name={`resourcePackages[${index}].student`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="Course Fee (Student)"
                      error={errors?.resourcePackages}
                      helperText={errors?.resourcePackages?.[index]?.student.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />

                <Controller
                  name={`resourcePackages[${index}].jobHolder`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="Course Fee (Job Holder)"
                      error={errors?.resourcePackages}
                      helperText={errors?.resourcePackages?.[index]?.jobHolder.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />

                {packageField.length > 1 && (
                  <IconButton onClick={() => packageRemove(index)}>
                    <MdRemove />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </ul> */}

      {/* <ul className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <IconButton onClick={() => packageAppend({ package: "", student: "", jobHolder: "" })}>
            <MdAdd />
          </IconButton>
        </div>
        <div className="flex flex-col gap-4">
          {packageField?.map((item, index) => (
            <div key={item.id}>
              <InputLabel className="mb-6 font-bold">Package {index + 1}</InputLabel>
              <Controller
                name={`resourcePackages[${index}].package`}
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Package name"
                    error={errors?.resourcePackages?.package.message}
                    // helperText={errors?.resourcePackages?.[index]?.package.message}
                    fullWidth
                    {...field}
                  />
                )}
              />

              <div className="mt-5 flex items-center gap-4">
                <Controller
                  name={`resourcePackages[${index}].student`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="Course Fee (Student)"
                      error={errors?.resourcePackages?.package.message}
                      // helperText={errors?.resourcePackages?.[index]?.package.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />

                <Controller
                  name={`resourcePackages[${index}].jobHolder`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="Course Fee (Job Holder)"
                      error={errors?.resourcePackages?.package.message}
                      // helperText={errors?.resourcePackages?.[index]?.package.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />

                {packageField.length > 1 && (
                  <IconButton onClick={() => packageRemove(index)}>
                    <MdRemove />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </ul>

      <Divider />
      <Controller
        name="notice"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Notice"
            minRows={4}
            multiline
            fullWidth
            error={errors?.notice}
            helperText={errors?.notice?.message}
            {...field}
          />
        )}
      />
      <div className="flex items-center gap-4">
        <InputLabel>Enabled</InputLabel>
        <Controller
          name="enabled"
          control={control}
          render={({ field }) => <Checkbox defaultChecked color="primary" {...field} />}
        />
      </div>
      <Divider />
      <InputLabel className="text-slate-900">Resources</InputLabel>
      <div className="flex gap-4">
        <ul className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <InputLabel>Videos</InputLabel>
            <IconButton onClick={() => videosAppend({ name: "" })}>
              <MdAdd />
            </IconButton>
          </div>
          <div className="flex flex-col gap-4">
            {videosField.map((item, index) => (
              <li className="flex items-center gap-2" key={item.id}>
                <Controller
                  name={`resourceVideos[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="Video URL"
                      fullWidth
                      error={errors?.resourceVideos}
                      helperText={errors?.resourceVideos?.[index]?.name?.message}
                      {...field}
                    />
                  )}
                />
                {videosField.length > 1 && (
                  <IconButton onClick={() => videosRemove(index)}>
                    <MdRemove />
                  </IconButton>
                )}
              </li>
            ))}
          </div>
        </ul>
        <ul className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <InputLabel>PDFs</InputLabel>
            <IconButton onClick={() => pdfsAppend({ name: "" })}>
              <MdAdd />
            </IconButton>
          </div>
          <div className="flex flex-col gap-4">
            {pdfsField?.map((item, index) => (
              <li className="flex items-center gap-2" key={item.id}>
                <Controller
                  name={`resourcePdfs[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="PDF URL"
                      fullWidth
                      error={errors?.resourcePdfs}
                      helperText={errors?.resourcePdfs?.[index]?.name.message}
                      {...field}
                    />
                  )}
                />
                {pdfsField.length > 1 && (
                  <IconButton onClick={() => pdfsRemove(index)}>
                    <MdRemove />
                  </IconButton>
                )}
              </li>
            ))}
          </div>
        </ul>
        <ul className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <InputLabel>PPTs</InputLabel>
            <IconButton onClick={() => pptsAppend({ name: "" })}>
              <MdAdd />
            </IconButton>
          </div>
          <div className="flex flex-col gap-4">
            {pptsField.map((item, index) => (
              <li className="flex items-center gap-2" key={item.id}>
                <Controller
                  name={`resourcePpts[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      label="PPT URL"
                      fullWidth
                      error={errors?.resourcePpts}
                      helperText={errors?.resourcePpts?.[index]?.name?.message}
                      {...field}
                    />
                  )}
                />
                {pptsField.length > 1 && (
                  <IconButton onClick={() => pptsRemove(index)}>
                    <MdRemove />
                  </IconButton>
                )}
              </li>
            ))}
          </div>
        </ul>
      </div>
      <Controller
        name="certificate"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            label="Certificate URL"
            fullWidth
            error={errors?.certificate}
            helperText={errors?.certificate?.message}
            {...field}
          />
        )}
      />
        */}
      <div className="flex justify-center">
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;

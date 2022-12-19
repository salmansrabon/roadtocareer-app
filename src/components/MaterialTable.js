/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import {
  MdAddBox,
  MdArrowDownward,
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdClear,
  MdDeleteOutline,
  MdEdit,
  MdFilterList,
  MdFirstPage,
  MdLastPage,
  MdRemove,
  MdSaveAlt,
  MdSearch,
  MdViewColumn,
} from "react-icons/md";

const tableIcons = {
  Add: forwardRef((props, ref) => <MdAddBox {...props} />),
  Check: forwardRef((props, ref) => <MdCheck {...props} />),
  Clear: forwardRef((props, ref) => <MdClear {...props} />),
  Delete: forwardRef((props, ref) => <MdDeleteOutline {...props} />),
  DetailPanel: forwardRef((props, ref) => <MdChevronRight {...props} />),
  Edit: forwardRef((props, ref) => <MdEdit {...props} />),
  Export: forwardRef((props, ref) => <MdSaveAlt {...props} />),
  Filter: forwardRef((props, ref) => <MdFilterList {...props} />),
  FirstPage: forwardRef((props, ref) => <MdFirstPage {...props} />),
  LastPage: forwardRef((props, ref) => <MdLastPage {...props} />),
  NextPage: forwardRef((props, ref) => <MdChevronRight {...props} />),
  PreviousPage: forwardRef((props, ref) => <MdChevronLeft {...props} />),
  ResetSearch: forwardRef((props, ref) => <MdClear {...props} />),
  Search: forwardRef((props, ref) => <MdSearch size={24} {...props} />),
  SortArrow: forwardRef((props, ref) => <MdArrowDownward {...props} />),
  ThirdStateCheck: forwardRef((props, ref) => <MdRemove {...props} />),
  ViewColumn: forwardRef((props, ref) => <MdViewColumn {...props} />),
};

const PatchedPagination = ({
  ActionsComponent,
  onChangePage,
  onChangeRowsPerPage,
  ...tablePaginationProps
}) => {
  return (
    <TablePagination
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />;
      }}
      {...tablePaginationProps}
    />
  );
};

const Table = (props) => (
  <MaterialTable
    icons={tableIcons}
    components={{
      Pagination: PatchedPagination,
    }}
    {...props}
  />
);

export default Table;

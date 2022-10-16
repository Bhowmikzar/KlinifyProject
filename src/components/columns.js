import { ColumnFilter } from "./ColumnFilter"

export const COLUMNS =[
    {
      Header:"Id",
      accessor:"_id",
      Filter : ColumnFilter
    },
    {
      Header: "Patient Name",
      accessor: "patient_name",
      Filter : ColumnFilter
    },
    {
      Header: "Sex",
      accessor:"sex",
      Filter : ColumnFilter
    },
    {
      Header: "Arrival Time",
      accessor:"arrival_time",
      Filter : ColumnFilter
    },
   
    {
      Header: "Doctor",
      accessor:"doctor",
      Filter : ColumnFilter
    }

    ]
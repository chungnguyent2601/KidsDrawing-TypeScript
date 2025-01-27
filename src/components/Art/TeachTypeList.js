import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtTypeModificationStatus } from "../../store/models/art_type.interface";
import { setModificationState } from "../../store/actions/art_type.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'


function TeachTypeList(props) {

    const dispatch = useDispatch();
  const art_types = useSelector((state) => state.art_types);
  console.log(props.value)


  const datas = art_types.artTypes;

  const options = {
    paginationSize: 5,
    ptypeStartIndex: 1,
    firstPtypeText: 'First',
    prePtypeText: 'Back',
    nextPtypeText: 'Next',
    lastPtypeText: 'Last',
    nextPtypeTitle: 'First ptype',
    prePtypeTitle: 'Pre ptype',
    firstPtypeTitle: 'Next ptype',
    lastPtypeTitle: 'Last ptype',
    showTotal: true,
    totalSize: datas.length,
    onSizePerPtypeChange: (sizePerPtype, ptype) => {
      console.log('Size per ptype change!!!');
      console.log('Newest size per ptype:' + sizePerPtype);
      console.log('Newest ptype:' + ptype);
    },
    onPtypeChange: (ptype, sizePerPtype) => {
      console.log('Ptype change!!!');
      console.log('Newest size per ptype:' + sizePerPtype);
      console.log('Newest ptype:' + ptype);
    }
  };


  function editButton(cell, row) {
    return (
      <div className="row mt-2">
        <div className="col-md-5 ml-2">
          <button type="button" className="btn btn-primary" onClick={()=> {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(ArtTypeModificationStatus.Edit))
          }}><FaEdit className="icon-edit"/></button>
        </div>
        <div className="col-md-5"> 
          <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(ArtTypeModificationStatus.Remove))
          }}><IoIosRemove className="icon-remove"/></button>
        </div>
      </div>
        
    )
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: 'description',
      text: 'Miêu tả'
    },
    {
      dataField: '',
      text: '',
      style:{
        width: '120px'
      },
      formatter: editButton
    }
  ];

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      {/* <PaginationListStandalone {...paginationProps} /> */}
      <div>
        <div>
          <BootstrapTable
            hover
            keyField="id"
            data={datas}
            columns={columns}
            filter={filterFactory()}
            {...paginationTableProps}
          />
        </div>
      </div>
      {/* <PaginationListStandalone {...paginationProps} /> */}
    </div>
  );


  return (
      <Fragment>
      <div>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          {contentTable}
        </PaginationProvider>
      </div >
    </Fragment>

  );
}

export default TeachTypeList;

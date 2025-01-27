import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtLevelModificationStatus } from "../../store/models/art_level.interface";
import { setModificationStateArtLevel } from "../../store/actions/art_level.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'


function TeachLevelList(props) {

    const dispatch = useDispatch();
  const art_levels = useSelector((state) => state.art_levels);
  console.log(props.value)


  const datas = art_levels.artLevels;

  const options = {
    paginationSize: 5,
    plevelStartIndex: 1,
    firstPlevelText: 'First',
    prePlevelText: 'Back',
    nextPlevelText: 'Next',
    lastPlevelText: 'Last',
    nextPlevelTitle: 'First plevel',
    prePlevelTitle: 'Pre plevel',
    firstPlevelTitle: 'Next plevel',
    lastPlevelTitle: 'Last plevel',
    showTotal: true,
    totalSize: datas.length,
    onSizePerPlevelChange: (sizePerPlevel, plevel) => {
      console.log('Size per plevel change!!!');
      console.log('Newest size per plevel:' + sizePerPlevel);
      console.log('Newest plevel:' + plevel);
    },
    onPlevelChange: (plevel, sizePerPlevel) => {
      console.log('Plevel change!!!');
      console.log('Newest size per plevel:' + sizePerPlevel);
      console.log('Newest plevel:' + plevel);
    }
  };


  function editButton(cell, row) {
    return (
      <div className="row mt-2">
        <div className="col-md-5 ml-2">
          <button type="button" className="btn btn-primary" onClick={()=> {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.Edit))
          }}><FaEdit className="icon-edit"/></button>
        </div>
        <div className="col-md-5"> 
          <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.Remove))
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

export default TeachLevelList;

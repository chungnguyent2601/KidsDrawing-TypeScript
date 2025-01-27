import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyClassModificationStatus } from "../../store/models/my_class.interface";
import { setModificationState } from "../../store/actions/my_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {MdAnalytics} from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'

function ClassList(props) {

    const dispatch = useDispatch();

    const myclasss = useSelector((state) => state.myclasses);
  
    const history = useHistory();
  
    
    const routeChange = (class_id, class_name) =>{ 
      let path = '/class/detail'; 
      localStorage.removeItem('class_id')
      localStorage.setItem('class_id', class_id.toString())
      localStorage.removeItem('class_name')
      localStorage.setItem('class_name', class_name)
      history.push({
        pathname: path,
        state: { class_id: class_id }
      });
    }


  const routeViewSchedule = (class_id, class_name) =>{ 
    localStorage.removeItem('class_id')
    localStorage.setItem('class_id', class_id.toString())
    localStorage.removeItem('class_name')
    localStorage.setItem('class_name', class_name)
    let path = '/class/schedule'; 
    history.push({
      pathname: path,
      state: { class_id: class_id }
    });
  }


  const datas = myclasss.myClasses;

  const options = {
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: datas.length,
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };




  function editButton(cell, row) {
    return (
      <div className="row mt-2">
        <div className="col-md-3 ml-2">
        <button type="button" className="btn btn-primary" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeChange(row.id, row.name)}}
          ><i class="fa fa-info-circle" aria-hidden="true"></i></button>
        </div>
        <div className="col-md-3">
        <button type="button" className="btn btn-primary" onClick={() => {
           if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(MyClassModificationStatus.Edit))
        }}
          ><FaEdit className="icon-edit"/></button>
        </div>
        <div className="col-md-3"> 
        <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect2) props.onSelect2(row);
            dispatch(setModificationState(MyClassModificationStatus.Remove))
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
      dataField: 'course_name',
      text: 'Thuộc khóa học',
      filter: textFilter()
    },
    {
      dataField: 'semester_name',
      text: 'Học kì',
      filter: textFilter()
    },
    {
      dataField: 'total_student',
      text: 'Số học sinh',
      filter: textFilter()
    },
    {
      dataField: 'teacher_name',
      text: 'Giáo viên',
      filter: textFilter()
    },
    {
      dataField: '',
      text: '',
      style:{
        width: '150px'
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

export default ClassList;

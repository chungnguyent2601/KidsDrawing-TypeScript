import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyClassModificationStatus } from "../../store/models/my_class.interface";
import { setModificationState } from "../../store/actions/my_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ClassTeacherEndList(props) {

    const dispatch = useDispatch();

    const class_teachers = useSelector((state) => state.class_teachers);
  
    const history = useHistory();
  
    
    const routeChange = (class_teacher) => {
        let path = '/classes-end/detail';
        localStorage.removeItem("class_id");
        localStorage.setItem("class_id", class_teacher.id.toString())
        localStorage.removeItem('class_end');
        localStorage.setItem('class_end', 'true');
        localStorage.removeItem('class_name');
        localStorage.setItem('class_name', class_teacher.name);
        history.push({
          pathname: path,
          state: { class_id: class_teacher.id }
        });
      }




  let datas = [];

  if (class_teachers.class_done.length > 0 && class_teachers !== undefined && class_teachers !== null) {
    datas = class_teachers.class_done
  }

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




  function detailClassButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeChange(row)}}
          ><i class="fa fa-info-circle" aria-hidden="true"></i></button>
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
        dataField: 'total_student',
        text: 'Số học sinh',
        filter: textFilter()
      },
      {
        dataField: 'num_of_section',
        text: 'Số buổi học',
        filter: textFilter()
      },
      {
        dataField: 'review_star',
        text: 'Điểm đánh giá (Thang điểm 100)',
      },
    {
      dataField: '',
      text: 'Hành động',
      formatter: detailClassButton
    },
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

export default ClassTeacherEndList;

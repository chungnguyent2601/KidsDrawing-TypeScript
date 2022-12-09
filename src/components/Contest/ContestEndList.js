import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../common/components/ConverDate";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { postGenerationContestSubmissionGrade } from "../../common/service/ContestSubmission/PostGenerationForTeacher";


function ContestEndList(props) {

  const dispatch = useDispatch();

    const contests = useSelector((state) => state.contests);
    const history = useHistory();

    const routeChange = (id) => {
      localStorage.setItem('contest_id', id.toString())
      let path = '/contest/result-grade';
        history.push({
            pathname: path,
        });
    }

    const routeChange1 = (id) => {
      localStorage.setItem('contest_id', id.toString())
      let path = '/contest-submission';
        history.push({
            pathname: path,
        });
    }
    const date_0 = new Date();
    const date = date_0.toUTCString()
    //console.log(date)
    const date_now = formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16);
    console.log( formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16))

  const datas = contests.contest_end

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

  const generationContestSubmission = (id) => {
    localStorage.setItem('contest_id', id)
      const idx = toast.info("Xếp thành công", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      dispatch(postGenerationContestSubmissionGrade(id, idx))
  }

  function viewDetailButton(cell, row) {
    if (row.check_gen !== false) {
      return (
        <button type="button" className="btn btn-primary" onClick={() => {
          routeChange(row.id)
        }}>Thống kê</button>
      )
    }
    return (
      <button type="button" className="btn btn-primary" onClick={() => {
        routeChange1(row.id)
      }}>Thống kê</button>
    )
  }

  function showStartTime(cell, row) {
    var strDate = row.start_time;
    return (
        <span>{strDate.replaceAll("T", " ").substring(0,16)}</span>
    )
  }

  function showEndTime(cell, row) {
    var strDate = row.end_time;
    return (
        <span>{strDate.replaceAll("T", " ").substring(0,16)}</span>
    )
  }


  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: 'art_type_name',
      text: 'Thể loại',
      filter: textFilter()
    },
    {
      dataField: 'art_age_name',
      text: 'Độ tuổi',
      filter: textFilter()
    },
    {
      dataField: 'start_time',
      text: 'Thời gian bắt đầu',
      formatter: showStartTime,
    },
    {
      dataField: 'end_time',
      text: 'Thời gian kết thúc',
      formatter: showEndTime,
    },
    {
        dataField: 'total_register_contest',
        text: 'Đã đăng kí',
      },
      {
        dataField: 'total_contest_submission',
        text: 'Số bài nộp',
      },
    {
      dataField: '',
      text: 'Hành động',
      formatter: viewDetailButton
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

export default ContestEndList;

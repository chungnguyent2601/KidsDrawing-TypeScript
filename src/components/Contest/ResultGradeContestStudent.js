import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import "./ResultGradeContestStudent.css"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";

const ResultGradeContestStudent = () => {
    const dispatch = useDispatch();
    const contest_submissions = useSelector((state) => state.contest_submissions);

    const top_score = contest_submissions.contest_gradeds.sort((a, b) => b.score - a.score).slice(0, 3)
    const tail_score = contest_submissions.contest_gradeds.sort((a, b) => b.score - a.score).slice(3, contest_submissions.contest_gradeds.length)
    var role = localStorage.getItem('role')
    var rolePrivilege = []
    var roleUser = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var id = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {

        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode = jwt_decode(access_token)
            let refresh_token_decode = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContest(dispatch, contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id, id]);

    var contest_name = localStorage.getItem('contest_name');
    var contest_name_ = "";
    if (contest_name !== null) {
        contest_name_ = contest_name;
    }

    const path = useSelector((state) => state.root.page);
    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", contest_name_));
    }, [path.area, dispatch, contest_name_])
    localStorage.setItem('path', '/contests')



    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

    function handleViewResult(user_graded_contest_submission) {
        if (contest_submissions !== null && contest_submissions !== undefined) {
            if (user_graded_contest_submission.student_id === id) {
                localStorage.removeItem('contest_submission_id');

                localStorage.removeItem('time_submit');
                localStorage.setItem('time_submit', user_graded_contest_submission.time.toString())
                localStorage.removeItem('score')
                localStorage.removeItem('feedback')
                if (user_graded_contest_submission.score !== undefined && user_graded_contest_submission.score !== null) {
                    localStorage.setItem('score', user_graded_contest_submission.score.toString());
                }
                if (user_graded_contest_submission.feedback !== undefined && user_graded_contest_submission.feedback !== null) {
                    localStorage.setItem('feedback', user_graded_contest_submission.feedback.toString());
                }
                localStorage.setItem('student_id', user_graded_contest_submission.student_id.toString());
                localStorage.removeItem('contest_id');
                localStorage.setItem('contest_id', user_graded_contest_submission.contest_id.toString());
                localStorage.setItem('url_conest_submission', user_graded_contest_submission.image_url.toString());
                localStorage.setItem('start_time', user_graded_contest_submission.start_time);
                localStorage.setItem('end_time', user_graded_contest_submission.end_time);
                localStorage.setItem('student_name', user_graded_contest_submission.student_name);
                let path = '/contest/score';
                history.push({
                    pathname: path
                });
            }
        }
    }

    let datas = [{
        id: 0,
        avatar: "https://res.cloudinary.com/djtmwajiu/image/upload/v1672987980/avatar-default-icon_xj2sxl.png",
        student_id: 0,
        contest_id: 0,
        student_name: "",
        contest_name: "",
        teacher_id: 0,
        teacher_name: "",
        image_url: "",
        score: 0,
        feedback: "",
        time: "",
        create_time: "",
        update_time: ""
    }];

    let datax = []
    if (tail_score.length > 0) {
        let check = true;
        tail_score.map((ele, idx) => {
            if (ele != undefined && ele != null) {
                if (ele.id != undefined && ele.id != null) {
                    datax.push(ele)
                }
                else {
                    check = false;
                }
            }
            else {
                check = false;
            }
        })
        if (check == true) {
            datas = datax
        }
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

    function numberCountButton(cell, row, rowIndex) {
        return (
            <span>{rowIndex + 3 + 1}</span>
        );
    }

    function nameButton(cell, row) {
        if (row != undefined) {
            if (row.student_name != undefined) {
                return (
                    <div className="avatar-table table-text-size mx-auto top-text-color" onClick={() => {
                        handleViewResult(row)
                    }}>
                        <img src={row.avatar}
                            alt="avatar mx-auto" className="rounded-circle img-fluid mr-3" />
                        {row.student_name}
                    </div>
                );
            }
        }
    }

    const columns = [
        {
            dataField: '',
            text: 'STT',
            formatter: numberCountButton
        },
        {
            dataField: 'student_name',
            text: 'Học sinh',
            filter: textFilter(),
            formatter: nameButton
        },
        {
            dataField: 'score',
            text: 'Điểm'
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
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>

                <div className="row justify-content-center blue-seven-one">
                    <div className="col-8 mt-3">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3ODUiIGhlaWdodD0iNzA2LjUiIHZpZXdCb3g9IjAgMCA3ODUgNzA2LjUiPgogIDxnIGlkPSJHcnVwb18yIiBkYXRhLW5hbWU9IkdydXBvIDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NDcgLTE0NS41KSI+CiAgICA8cmVjdCBpZD0iUmVjdMOhbmd1bG9fMSIgZGF0YS1uYW1lPSJSZWN0w6FuZ3VsbyAxIiB3aWR0aD0iOTgiIGhlaWdodD0iMTg1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OTAuMzQ5IDUyMykiIGZpbGw9IiNmZmI0MmIiLz4KICAgIDxwYXRoIGlkPSJSZWN0w6FuZ3Vsb18yIiBkYXRhLW5hbWU9IlJlY3TDoW5ndWxvIDIiIGQ9Ik0xNS42ODYsMEgzODguMzE0QTE1LjY4NiwxNS42ODYsMCwwLDEsNDA0LDE1LjY4NlYyNDRBMjAyLDIwMiwwLDAsMSwyMDIsNDQ2aDBBMjAyLDIwMiwwLDAsMSwwLDI0NFYxNS42ODZBMTUuNjg2LDE1LjY4NiwwLDAsMSwxNS42ODYsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDczNy4zNDkgMTQ1LjUpIiBmaWxsPSIjZmZjMzM1Ii8+CiAgICA8cGF0aCBpZD0iVHJhemFkb18yIiBkYXRhLW5hbWU9IlRyYXphZG8gMiIgZD0iTTc2NSw0MTNoMGMtMTQuNTE5LDAtOTEuNzQ5LTEuNDUtMTU0LjE0OS02My44NTFBMjE3LjMxNCwyMTcuMzE0LDAsMCwxLDU0NywxOTVINzY1Wk03MzcsMjMwSDU5OUExMzgsMTM4LDAsMCwwLDczNywzNjhoMFoiIGZpbGw9IiNmZmI0MmIiLz4KICAgIDxwYXRoIGlkPSJUcmF6YWRvXzMiIGRhdGEtbmFtZT0iVHJhemFkbyAzIiBkPSJNMTExNCwxOTVoMjE4YzAsMTIwLjQtOTcuNiwyMTgtMjE4LDIxOGgwWm0yOCwxNzNoMGExMzgsMTM4LDAsMCwwLDEzOC0xMzhIMTE0MloiIGZpbGw9IiNmZmI0MmIiLz4KICAgIDxwYXRoIGlkPSJSZWN0w6FuZ3Vsb18zIiBkYXRhLW5hbWU9IlJlY3TDoW5ndWxvIDMiIGQ9Ik03MiwwSDE5M2E3Miw3MiwwLDAsMSw3Miw3MnYwYTAsMCwwLDAsMSwwLDBIMGEwLDAsMCwwLDEsMCwwdjBBNzIsNzIsMCwwLDEsNzIsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwNi44NDkgNzA4KSIgZmlsbD0iI2ZmYzMzNSIvPgogICAgPHBhdGggaWQ9IlJlY3TDoW5ndWxvXzQiIGRhdGEtbmFtZT0iUmVjdMOhbmd1bG8gNCIgZD0iTTcyLDBINDE3YTcyLDcyLDAsMCwxLDcyLDcydjBhMCwwLDAsMCwxLDAsMEgwYTAsMCwwLDAsMSwwLDB2MEE3Miw3MiwwLDAsMSw3MiwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjk0Ljg0OSA3ODApIiBmaWxsPSIjZmZiNDJiIi8+CiAgICA8cGF0aCBpZD0iVHJhemFkb180IiBkYXRhLW5hbWU9IlRyYXphZG8gNCIgZD0iTTExMDksNDE4cy0yNC41MTUsMTM0LTE0OCwxMzRaIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjYiLz4KICAgIDxnIGlkPSJMaXZlbGxvXzEwMCIgZGF0YS1uYW1lPSJMaXZlbGxvIDEwMCI+CiAgICAgIDxwYXRoIGlkPSJUcmF6YWRvXzUiIGRhdGEtbmFtZT0iVHJhemFkbyA1IiBkPSJNMTAxOC42LDMxNy42MTJhNi44ODYsNi44ODYsMCwwLDAtNi45OTUtNi43NzFjLS4yNDksMC0uNDkzLjAxNC0uNzM1LjAzNmwtNDguMzA2LTEuMTQtMTYuNS00My4wODFhNy4wNDcsNy4wNDcsMCwwLDAtMTMuNDMxLDBsLTE2LjUwNiw0My4wODEtNDguMywxLjE0Yy0uMjQyLS4wMjQtLjQ4OS0uMDM2LS43MzUtLjAzNmE2Ljg4MSw2Ljg4MSwwLDAsMC02Ljk5MSw2Ljc3MSw2LjcwOSw2LjcwOSwwLDAsMCwzLjIsNS42ODdsMzguNDc2LDI3LjItMTMuNzI5LDQyLjY3MmE2LjUxMSw2LjUxMSwwLDAsMC0uNzgzLDMuMSw2Ljg4NSw2Ljg4NSwwLDAsMCw2Ljk5NCw2Ljc3NCw3LjEsNy4xLDAsMCwwLDQuMzM5LTEuNDY4TDkzOS4zNTMsMzc1LjdsNDAuNzU4LDI1Ljg3N2E3LjEsNy4xLDAsMCwwLDQuMzM4LDEuNDY4LDYuODg1LDYuODg1LDAsMCwwLDYuOTkxLTYuNzc0LDYuNTM3LDYuNTM3LDAsMCwwLS43ODMtMy4xTDk3Ni45MywzNTAuNWwzOC40NzQtMjcuMmE2LjcyNiw2LjcyNiwwLDAsMCwzLjItNS42ODciIGZpbGw9IiNmZmYiLz4KICAgIDwvZz4KICAgIDxwYXRoIGlkPSJUcmF6YWRvXzYiIGRhdGEtbmFtZT0iVHJhemFkbyA2IiBkPSJNMTE1Ni44MjMsNjg3LjY1OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGZmZmU5IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMSIvPgogIDwvZz4KPC9zdmc+Cg=="
                            className="w-18 mx-auto d-block" alt="Trofeo" />
                    </div>

                    <div className="col-12">
                        <h3 className="white-text font-weight-bold text-center mb-4 mt-2">
                            Bảng xếp hạng
                        </h3>

                        <div className="row justify-content-center mt-3">
                            <div className="col-10 col-sm-10 col-md-10 col-lg-3 mb-4">
                                <div className="white top-padding rounded-all" onClick={() => {
                                    handleViewResult(top_score[0])
                                }}>
                                    <img src="https://raw.githubusercontent.com/JackZeled0n/MDB-Help/master/MDB-Help/7%20x%201/images/Grupo1B.png"
                                        className="top-img-1 " alt="" />

                                    <div className="avatar mx-auto flex-center">
                                        <img src={top_score.length > 0 && top_score[0].avatar != undefined ? top_score[0].avatar : ""} alt="avatar mx-auto white"
                                            className="rounded-circle img-fluid " />
                                    </div>

                                    <h4 className="text-center green-seven-one-text mt-2">
                                        <p className="text-top">{top_score.length > 0 && top_score[0].student_name != undefined ? top_score[0].student_name : ""}</p>
                                    </h4>

                                    <p className="text-muted mt-2 text-center">
                                        {top_score.length > 0 ? top_score[0].score : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="col-10 col-sm-10 col-md-10 col-lg-3 mb-4">
                                <div className="white top-padding rounded-all" onClick={() => {
                                    handleViewResult(top_score[1])
                                }}>
                                    <img src="https://raw.githubusercontent.com/JackZeled0n/MDB-Help/master/MDB-Help/7%20x%201/images/Grupo2B.png"
                                        className="top-img" alt="" />

                                    <div className="avatar mx-auto flex-center">
                                        <img src={top_score.length > 1 && top_score[1].avatar != undefined ? top_score[1].avatar : ""} alt="avatar mx-auto white"
                                            className="rounded-circle img-fluid" />
                                    </div>

                                    <h4 className="text-center green-seven-one-text mt-2">
                                        <p className="text-top"> {top_score.length > 1 && top_score[1].student_name ? top_score[1].student_name : ""}</p>
                                    </h4>

                                    <p className="text-muted mt-2 text-center">
                                        {top_score.length > 1 ? top_score[1].score : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="col-10 col-sm-10 col-md-10 col-lg-3">
                                <div className="white top-padding rounded-all" onClick={() => {
                                    handleViewResult(top_score[2])
                                }}>
                                    <img src="https://raw.githubusercontent.com/JackZeled0n/MDB-Help/master/MDB-Help/7%20x%201/images/Grupo3B.png"
                                        className="top-img" alt="" />

                                    <div className="avatar mx-auto flex-center">
                                        <img src={top_score.length > 2 && top_score[2].avatar != undefined ? top_score[2].avatar : ""} alt="avatar mx-auto"
                                            className="rounded-circle img-fluid" />
                                    </div>

                                    <h4 className="text-center green-seven-one-text mt-2">
                                        <p className="text-top">{top_score.length > 2 && top_score[2].student_name ? top_score[2].student_name : ""}</p>
                                    </h4>

                                    <p className="text-muted mt-2 text-center">
                                        {top_score.length > 2 ? top_score[2].score : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12"></div>
                    </div>

                    <div className="col-lg-9 mt-3">
                        <div>
                            <PaginationProvider
                                pagination={
                                    paginationFactory(options)
                                }
                            >
                                {contentTable}
                            </PaginationProvider>
                        </div >
                    </div>

                </div>

            </Fragment>
    );
};

export default ResultGradeContestStudent;

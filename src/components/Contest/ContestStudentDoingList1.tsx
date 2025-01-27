import React, { Dispatch, Fragment, useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { IStateType, IContestStudentState, IArtTypeState, IArtAgeState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IContestStudent } from "../../store/models/contest_student.interface";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { getContestSubmissionByContestAndStudent } from "../../common/service/ContestSubmission/GetContestSubmissionByContestAndStudent";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

function ContestStudentDoingList1(props: lessonListProps): JSX.Element {
    const contest_students: IContestStudentState = useSelector((state: IStateType) => state.contest_students);
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    const dispatch: Dispatch<any> = useDispatch();
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IContestStudent[]>([])

    var id_x = localStorage.getItem('id');
    let id = 0;

    if (id_x !== null) {
        id = parseInt(id_x);
    }
    
    const history = useHistory();
    const routeChange = (contest_student: IContestStudent) =>{ 
        localStorage.removeItem("contest_id")
        localStorage.setItem('contest_id', contest_student.id.toString())
        localStorage.removeItem("contest_name")
        localStorage.setItem('contest_name', contest_student.name)
        localStorage.removeItem("contest_description")
        localStorage.setItem('contest_description', contest_student.description)
        localStorage.removeItem("max_participant")
        localStorage.setItem('max_participant', contest_student.max_participant.toString())
        localStorage.removeItem("art_type_contest")
        localStorage.setItem('art_type_contest', contest_student.art_type_name)
        localStorage.removeItem("art_age_contest")
        localStorage.setItem('art_age_contest', contest_student.art_age_name)
        localStorage.removeItem("registration_time")
        localStorage.setItem('registration_time', contest_student.registration_time)
        localStorage.removeItem("start_time")
        localStorage.setItem('start_time', contest_student.start_time)
        localStorage.removeItem("end_time")
        localStorage.setItem('end_time', contest_student.end_time)
        let path = '/contests/submit'; 
        history.push({
            pathname: path,
        });
    }

    useEffect(() => {
        let x = (contest_students.contest_opening.length - contest_students.contest_opening.length % 10) /10;
        if (x === 0) {
            setElement(contest_students.contest_opening)
        }
        else {
            setElement(contest_students.contest_opening.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [contest_students.contest_opening])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(contest_students.contest_opening.slice(count*10))
        }
        else {
            setElement(contest_students.contest_opening.slice(count*10,count*10 + 10))
        }
    }

    const [filter, setFilter] = useState(0)
    const [filter1, setFilter1] = useState(0)


    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function handleChange1(e: any) {
        setFilter1(e.target.value)
    }


    console.log(element)

    function handleFilter() {
        if (filter == 0 && filter1 == 0) {
            let k = contest_students.contest_not_open_now;

            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        
        else if (filter == 0 && filter1 != 0 ) {
            let k = contest_students.contest_opening.filter((ele, idx) => ele.art_age_id == filter1)

            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 == 0 ) {
            let k = contest_students.contest_opening.filter((ele, idx) => ele.art_type_id == filter)

            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 != 0 ) {
            let k = contest_students.contest_opening.filter((ele, idx) => ele.art_type_id == filter && ele.art_age_id == filter1)

            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
    }


    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-row justify-content-between align-items-center filters mt-2">
                            <h6 className="ml-3">Có {element.filter((val) => {
                                if (props.value === "") {
                                    return val;
                                }
                                else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
                                    return val;
                                }
                                return null
                            }).length} kết quả</h6>
                            <div className="right-sort">
                                <div className="sort-by mr-3">
                                    <span className="mr-1">Lọc theo:</span>
                                    <select name="cars" id="cars"
                                        value={filter}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Choose...</option>
                                        {
                                            art_types.artTypes.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                )
                                            })
                                        }
                                    </select>   
                                    <select name="cars" id="cars" className="pl-2"
                                        value={filter1}
                                        onChange={handleChange1}
                                    >
                                        <option value={0}>Choose...</option>
                                        {
                                            art_ages.artAges.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                )
                                            })
                                        }
                                    </select>                              
                                    <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => {handleFilter()}}>Lọc&nbsp;<i className="fa fa-flask"></i></button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    {
                        element.filter((val) => {
                            if (props.value === "") {
                                return val;
                            }
                            else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
                                return val;
                            }
                            return null
                        }).map((ele, index) => {
                            if (ele === undefined) {
                                return null
                            }
                            return (
                                <div className="col-md-4" onClick={() => { routeChange(ele) }}>
                                    <div className="p-card bg-white p-2 rounded px-3 product-x">
                                        <div className="d-flex align-items-center credits"><img src={ele.image_url} className="image-cardx" width="100%" alt="" /></div>
                                        <h5 className="mt-2 " style={{color: "#3A7CFB"}}>{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name}</span>
                                        <span className="d-block">
                                                <span className="title-card">
                                                    Ngày bắt đầu: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.start_time.replaceAll("T", " ").substring(0,16)}
                                                </span>               
                                            </span>

                                            <span className="d-block">
                                                <span className="title-card">
                                                    Ngày kết thúc đầu: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.end_time.replaceAll("T", " ").substring(0,16)}
                                                </span>               
                                            </span>

                                            <span className="d-block mb-2">
                                                <span className="title-card">
                                                    Đã đăng kí: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.total_register_contest}/{ele.max_participant}
                                                </span>               
                                            </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="d-flex justify-content-end text-right mt-2">
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" aria-label="Previous" href="/" onClick={(e) => e.preventDefault()}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {
                                Array.from(Array((totalPage)).keys()).map((ele, idx) => {
                                    return (
                                        <li className="page-item"><a className="page-link" href="/" onClick={(e) => { 
                                            e.preventDefault()
                                            handlePagination(ele) }}>{ele + 1}</a></li>
                                    )
                                })
                            }
                            <li className="page-item">
                                <a className="page-link" aria-label="Next" href="/" onClick={(e) => e.preventDefault()}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </Fragment>
    );
}

export default ContestStudentDoingList1;

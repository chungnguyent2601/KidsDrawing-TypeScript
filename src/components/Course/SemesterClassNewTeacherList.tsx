import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { ISemesterClassTeacherState, IStateType } from "../../store/models/root.interface";
import { ISemesterClassTeacher } from "../../store/models/semester_class_teacher.interface";
import "./CourseListNew.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
};

function SemesterClassNewTeacherList(props: semesterListProps): JSX.Element {
    const semester_class_teacher: ISemesterClassTeacherState = useSelector((state: IStateType) => state.semester_class_teachers);
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<ISemesterClassTeacher[]>([])

    useEffect(() => {
        let x = (semester_class_teacher.semester_class_teachers.length - (semester_class_teacher.semester_class_teachers.length) % 6) / 6;
        if (x === 0) {
            setElement(semester_class_teacher.semester_class_teachers)
        }
        else {
            setElement(semester_class_teacher.semester_class_teachers.slice(0, 6))
        }

        setTotalPage((x + 1))
    }, [semester_class_teacher.semester_class_teachers])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
            if (count === totalPage) {
                setElement(semester_class_teacher.semester_class_teachers.slice(count * 6))
            }
            else {
                setElement(semester_class_teacher.semester_class_teachers.slice(count * 6, count * 6 + 6))
            }

    }

    const history = useHistory();
    const routeChange = (course: ISemesterClassTeacher) => {
        localStorage.removeItem('description_course');
        localStorage.setItem('description_course', course.description);
        localStorage.removeItem('course_id');
        localStorage.setItem('course_id', course.course_id.toString())
        localStorage.removeItem('course_name');
        localStorage.setItem('course_name', course.course_name)
        localStorage.removeItem('art_age_name');
        localStorage.setItem('art_age_name', course.art_age_name.toString())
        localStorage.removeItem('art_type_name');
        localStorage.setItem('art_type_name', course.art_type_name.toString())
        localStorage.removeItem('num_of_section');
        localStorage.setItem('num_of_section', course.num_of_section.toString())
        localStorage.removeItem('schedule');
        localStorage.setItem('schedule', course.schedule.toString())
        localStorage.removeItem('art_level_name');
        localStorage.setItem('art_level_name', course.art_level_name.toString())
        localStorage.removeItem('semester_class_name');
        localStorage.setItem('semester_class_name', course.name.toString())
        localStorage.removeItem('price');
        localStorage.setItem('price', course.price.toString())
        localStorage.removeItem('semester_class_id');
        localStorage.setItem('semester_class_id', course.id.toString())
        localStorage.removeItem('url_image');
        localStorage.setItem('url_image', course.image_url.toString())
        let path = '/semester-class/detail';
        history.push({
            pathname: path
        });
    }



    return (
        <Fragment>
            <div className="container mb-5">
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
                                        <div className="d-flex align-items-center credits"><img src={ele.image_url} width="100%" alt="" /></div>
                                        <h5 className="mt-2">{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name} &amp; {ele.art_level_name}</span>
                                        <span className="d-block schedule-x">Lịch học: {ele.schedule}</span>
                                        <span className="d-block">Số đăng kí tối đa: {ele.max_participant}</span>
                                        <span className="d-block">Ngày hết hạn đăng kí: {ele.registration_deadline.substring(0, 10) + " " + ele.registration_deadline.substring(11, 19)}</span>
                                        <div
                                            className="d-flex justify-content-between stats">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">Giá: {ele.price} VND</span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">
                                                    
                                                </span></div>
                                        </div>
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

export default SemesterClassNewTeacherList;

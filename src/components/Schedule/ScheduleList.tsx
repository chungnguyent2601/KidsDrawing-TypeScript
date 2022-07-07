import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";
import { useHistory } from "react-router-dom";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'name': 'Học kì 1 năm học 2022',
    'number_day': 2,
    'leasson_time': ['Thứ 2 (7:00 AM - 8:00 AM)', 'Thứ 4 (8:00 AM - 9:00 AM)'],
  },
  {
    'id': 2,
    'name': 'Học kì 1 năm học 2022',
    'number_day': 2,
    'leasson_time': ['Thứ 3 (7:00 AM - 8:00 AM)', 'Thứ 5 (8:00 AM - 9:00 AM)'],
  }
]

function SemesterList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.number_day}</td>
      <td>
        {product.leasson_time.map((val, index) => {
            return (
                <p>{val}</p>
            )
        })}
      </td>
      <td>
        <button type="button" className="btn btn-primary">Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Số buổi học trong tuần</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default SemesterList;
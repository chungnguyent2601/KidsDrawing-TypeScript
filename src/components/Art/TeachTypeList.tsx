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
    'name': 'Chì màu',
    'description': 'xxx',
  },
  {
    'id': 2,
    'name': 'Sáp màu',
    'description': 'xxx',
  },
  {
    'id': 3,
    'name': 'Sơn dầu',
    'description': 'xxx',
  }
]

function TeachTypeList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/teachers/detail'; 
    history.push(path);
  }

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      onClick={routeChange}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.description}</td>
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
            <th scope="col">Miêu tả</th>
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

export default TeachTypeList;
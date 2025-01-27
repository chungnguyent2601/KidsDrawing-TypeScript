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
    'name': 'Khóa học lá chì màu',
    'art_type': 'Chì màu',
    'art_level': '10-14 tuổi'
  },
  {
    'id': 2,
    'name': 'Khóa học lá sơn màu',
    'art_type': 'Sơn dầu',
    'art_level': '4-6 tuổi'
  },
]

function CourseMinSign(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/semester-class/detail'; 
    history.push(path);
  }

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row `}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td onClick={routeChange}>{product.name}</td>
      <td>{product.art_type}</td>
      <td>{product.art_level}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Độ tuổi</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default CourseMinSign;

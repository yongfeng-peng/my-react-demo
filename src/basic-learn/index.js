import React from 'react';
import ReactDOM from 'react-dom';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return(
      <tr>
        <th colSpan="2">{ category }</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>
    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class NoData extends React.Component {
  render() {
    return (
      <tr>
        <td colSpan="2" style={{fontSize: 12}}>暂无数据。。。</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const rows = [];
    let lastCategory = null;
    this.props.products.forEach((product, index) => {
      // 如果不包好输入的值
      if(product.name.indexOf(filterText) === -1) {
        return;
      }
      if(inStockOnly && !product.stocked) {
        return;
      }
      if(product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow category={ product.category } key={index}  />
        )
      }
      rows.push(
        <ProductRow product={ product } key={product.name}  />
      )
      lastCategory = product.category;
    })
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows .length ? rows : <NoData />}
        </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFilterTextChange = (e) => {
    this.props.onFilterTextChange(e.target.value);
  }
  handleInStockChange = (e) => {
    this.props.onInStockChange(e.target.checked);
  }
  render() {
    let filterText = this.props.filterText;
    let inStockOnly = this.props.inStockOnly;
    return(
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

// React 中的数据流是单向的，并顺着组件层级从上往下传递。
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '', // 用户输入框的值
      inStockOnly: false, // 是否勾选复选框，默认不勾选
    };
  }
  handleFilterTextChange = (filterText) => {
    this.setState({
      filterText: filterText
    })
  }
  handleInStockChange = (inStockOnly) => {
    this.setState({
      inStockOnly
    })
  }
  render() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable 
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
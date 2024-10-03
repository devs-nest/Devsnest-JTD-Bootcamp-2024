import { Component } from "react";

export default class Products extends Component {

    constructor() {
        console.log("Constructor Invoked.")
        super();

        this.state = {
            categories: [],
            products: [],
            selectedCategory: null
        };
    }

    componentDidMount() {
        console.log("Component did mount.");
        this.getAllCategories();
    }

    componentWillUnmount() {
        // write all clean up here.
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log({ prevProps, prevState, snapshot });

        if (this.state.selectedCategory != prevState.selectedCategory) {
            this.getProductsByCategory();
        }
    }


    getProductsByCategory() {
        fetch(`https://fakestoreapi.com/products/category/${this.state.selectedCategory}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    products: json
                })
            });
    }

    getAllCategories() {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                    categories: json,
                    selectedCategory: json[0]
                });
            })
    }

    handleCategoryChange = (event) => {
        this.setState({
            selectedCategory: event.target.value
        });
    }

    render() {
        console.log("render() invoked.")
        return <div>
            <h2> Choose Product Category</h2>
            <select name="category" id="category" onChange={this.handleCategoryChange}>
                {
                    this.state.categories.map(
                        (category, index) => <option key={category} value={category}> {category.toUpperCase()}</option>
                    )
                }
            </select>

            <section className="products">
                {
                    this.state.products.map((product) =>{
                        return <section key={product.id} className="product">
                            <img style={{height: 200, width: 200}} src={product.image} alt={product.title} />
                            <section><h2>{product.title}</h2></section>
                        </section>
                    })
                }
            </section>

        </div>
    }
}
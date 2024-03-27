import React from 'react'
import { useState , useEffect} from 'react'
import "./home.scss"
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useProduct } from '../contextApi/ProductContext';


function Home() {
  
    const [isAddingOption, setIsAddingOption] = useState(false);
    const [product, setProduct] = useState({
          title: '',
          description: '',
          options: [],
          variants: []
     });
    const { setProducts } = useProduct();
    const navigate = useNavigate();
    const [currentOption, setCurrentOption] = useState({ name: '', values: [''] });


    useEffect(() => {
         initializeVariants();
     },[product.options]);


    const initializeVariants = () => {
      const newVariants = product.options.flatMap(option =>
      option.values.map(value => ({
        optionName: option.name,
        optionValue: value,
        price: '',
        quantity: ''
      }))
    );

    // Log the new variants to see if they are being created as expected
    console.log(newVariants);
     setProduct(prevProduct => ({ ...prevProduct, variants: newVariants }));
    };


    const handleChange = (event) => {
      const { name, value } = event.target;
      setProduct({ ...product, [name]: value });
    };


    const handleOptionNameChange = (event) => {
      setCurrentOption({ ...currentOption, name: event.target.value });
    };


    const handleOptionValuesChange = (index, event) => {
      const newValues = [...currentOption.values];
      newValues[index] = event.target.value;
      setCurrentOption({ ...currentOption, values: newValues });
    };
 

    const addOptionValue = () => {
       setCurrentOption({ ...currentOption, values: [...currentOption.values, ''] });
    };


    const saveOption = () => {
       if (!currentOption.name || currentOption.values.some(value => value.trim() === '')) {
          alert('Option name and values are required!');
          return;
    }

    // Check if we're editing an existing option or adding a new one
    if (currentOption.hasOwnProperty('index')) {
      // Editing an existing option
      const updatedOptions = product.options.map((option, i) =>
        i === currentOption.index ? currentOption : option
      );
      setProduct({ ...product, options: updatedOptions });
    } else {
      // Adding a new option
      setProduct({ ...product, options: [...product.options, currentOption] });
    }
    setCurrentOption({ name: '', values: [''] }); // Reset current option
    initializeVariants(); 
    setIsAddingOption(false);
    };



    const editOption = (index) => {
      const optionToEdit = { ...product.options[index], index }; // Copy the option and save its index
       setCurrentOption(optionToEdit);
       setIsAddingOption(true);
    };


    const addOption = () => {
       setCurrentOption({ name: '', values: [''] }); // Reset current option
       setIsAddingOption(true);
    };
 
    
    const handleVariantChange = (index, field, value) => {
       const updatedVariants = [...product.variants];
          updatedVariants[index] = { ...updatedVariants[index], [field]: value };
          setProduct({ ...product, variants: updatedVariants });
     };
  

  
    const saveProduct = () => {
      // Here you would normally send the product to the backend, but since
      // we're not integrating with one, we'll just console log it.
      console.log('Product saved:', product);
      setProducts(product);
      navigate('/product');
      // Redirect to preview page or handle preview logic here...
    };



  return (
    <div className='home'>
     <div className='homeContainer'>
       <h1>Add Product</h1>
       <form onSubmit={(e) => e.preventDefault()}>
       <div className='header'>
        <div className='title'>
          <label>Title:</label>
          <input type="text" name="title" value={product.title} onChange={handleChange} />
        </div>
        <div className='description'>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>
        </div>
        <div className='option'>
          <h3>Options:</h3>
          {product.options
            .filter(option => option.name && option.values.every(value => value.trim() !== ''))
            .map((option, index) => (
              <div className='optionContainer' key={index}>
                <div className='left'><strong>{option.name}</strong><span>{option.values.join(', ')}</span></div>
                <div className='right'><button type="button" className='button' onClick={() => editOption(index)}>Edit</button></div>
              </div>
          ))}
          {isAddingOption && (
            <>
             <div className='optionBar'>
              <div className='optionName'>
                <label>Option Name:</label>
                <input type="text" value={currentOption.name} onChange={handleOptionNameChange} list="option-names" />
                <datalist id="option-names">
                  <option value="Color" />
                  <option value="Material" />
                  <option value="Style" />
                  <option value="Size" />
                </datalist>
              </div>
              <div className='optionValues'>
                <label>Option Values:</label>
                
                {currentOption.values.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => handleOptionValuesChange(index, e)}
                  />
                ))}
                <button type="button" onClick={addOptionValue}>Add Value</button>
              </div>
              <div className='optionButton'>
                  <button type="button" onClick={saveOption}>Done</button>
           
              </div>
            </div>
            </>
          )}
          {!isAddingOption && (
            <div className="addOption"> <button type="button" onClick={addOption}>Add Option</button></div>
          )}
        </div>
        
        
        <div className='variant'>
        <h3>Variants:</h3>
        {product.variants.map((variant, index) => (
         <div key={index} className='variantContainer'>
          <strong>{variant.optionName}: {variant.optionValue}</strong>
         
          <input
           type="number"
           placeholder="Price"
           value={variant.price}
           onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
         />
         <input
          type="number"
          placeholder="Quantity"
          value={variant.quantity}
         onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
         />
       </div>
        ))}
       </div>
       <div className='buttonContainer'><button className="button" type="button" onClick={saveProduct}>Save Product</button></div>
      </form>
    </div>
    </div>
  )
}

export default Home

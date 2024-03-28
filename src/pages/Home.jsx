import React from 'react'
import { useState , useEffect} from 'react'
import "./home.scss"
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../contextApi/ProductContext';


function Home() {
  
    const [isAddingOption, setIsAddingOption] = useState(false);
    const [product, setProduct] = useState({
      title: 'Default Product Title',
      description: 'Default product description goes here.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  
      options: [],
      variants: []
    });
    const { setProducts } = useProduct();
    const navigate = useNavigate();
    const [currentOption, setCurrentOption] = useState({ name: '', values: [''] });


   //update on product option 
    useEffect(() => {
         initializeVariants();
     },[product.options]);

    //initialize variant after option name and value 
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


    //logic for handling option name change
    const handleOptionNameChange = (event) => {
      setCurrentOption({ ...currentOption, name: event.target.value });
    };

    //logic for handling option value change
    const handleOptionValuesChange = (index, event) => {
      const newValues = [...currentOption.values];
      newValues[index] = event.target.value;
      setCurrentOption({ ...currentOption, values: newValues });
    };
 
    //logic for adding option value
    const addOptionValue = () => {
       setCurrentOption({ ...currentOption, values: [...currentOption.values, ''] });
    };

    //saving option 
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
    //generating the variants when a user is done entering the product
    initializeVariants(); 
    setIsAddingOption(false);
    };


    //logic if option is to be edited
    const editOption = (index) => {
      const optionToEdit = { ...product.options[index], index }; // Copy the option and save its index
       setCurrentOption(optionToEdit);
       setIsAddingOption(true);
    };

    //logic for handling adding option
    const addOption = () => {
       setCurrentOption({ name: '', values: [''] }); // Reset current option
       setIsAddingOption(true);
    };
 
    //logic for handling variant change
    const handleVariantChange = (index, field, value) => {
       const updatedVariants = [...product.variants];
          updatedVariants[index] = { ...updatedVariants[index], [field]: value };
          setProduct({ ...product, variants: updatedVariants });
     };
  

    //logic for saving the product 
    const saveProduct = () => {
      // Here you would normally send the product to the backend, but since
      // we're not integrating with one we update to contextApi
  
      setProducts(product);

      // Redirect to preview page 
      navigate('/product');
      
    };



  return (
    <div className='home'>
     <div className='homeContainer'>
       <h1>Add Product</h1>
       <form onSubmit={(e) => e.preventDefault()}>
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

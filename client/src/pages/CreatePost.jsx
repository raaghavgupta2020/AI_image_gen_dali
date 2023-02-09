import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import Formfield from '../components/Formfield'
import Loader from '../components/Loader'
import { getRandomPrompt } from '../utils' 
//we have created this function , and now we can import it here , everytime we call it , it will give us a new random prompt 


const CreatePost = () => {
    const navigate = useNavigate(); //so that once the post is created we navigate back to the home page 
    const [form , setForm] = useState(
        {
            name:'',
            prompt:'',
            photo:''
        }
    );

    const [generatingImg, setGeneratingImg] = useState(false) //similar as loading , basically when we are waiting to get back the image from the api
    const [loading, setLoading] = useState(false) 

    const generateImage = async () => {
        //from here we can call our backend 
        //first we have to check if we have a prompt
        if(form.prompt){
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle',{
                    method : 'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({prompt : form.prompt}),
                })

                const data = await response.json();
                setForm({...form , photo:`data:image/jpeg;base64,${data.photo}`})

            } catch (error) {
                alert(error);
            }finally{
                setGeneratingImg(false);
            }
        }else{
            alert("Please enter a prompt")
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents browser from automatically reloading our application 
        
        if(form.prompt && form.photo){
            setLoading(true)

            try {
                const response = await fetch('http://localhost:8080/api/v1/post' , {
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(form),
                })

                await response.json();
                navigate('/')

            } catch (error) {
                alert(error);
            }finally{
                setLoading(false);
            }
            //now this entire thing is responsible for -> sending entire form data to post routes , there all the data will be saved into the schenma that we have created 
            //now on the home page we have to make a call to the database to get all that saved data , that will be done by useEffect hook

        }else{
            alert("Please enter a prompt and generate an image")
        }
    }
    
    const handleChange = (e) => {
        setForm({...form , [e.target.name] : e.target.value});
    }
    
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);//we are passing this so that we get a different prompt from this everytime
        setForm({...form , prompt : randomPrompt})
    }


    return (
        <section>
            <div>
                <h2 className='font-extrabold text-[32px]'>Create</h2>
                <p>Create imaginative and visually stunning images by DALL-E AI and share with the community</p>
            </div>

            <form className='mt-16' action="" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <Formfield
                        labelName = "Enter your name"
                        type = "text"   
                        name = "name"
                        placeholder = "Raghav Gupta"
                        value ={form.name}
                        handleChange = {handleChange}
                    />

                    <Formfield
                        labelName = "Prompt"
                        type = "text"
                        name = "prompt"
                        placeholder = "A plush toy robot sitting against a yellow wall"
                        value ={form.prompt}
                        handleChange = {handleChange}
                        isSurpriseMe
                        handleSurpriseMe = {handleSurpriseMe}
                    />

                    
                    <div className='relative border rounded-lg focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center'>
                        {form.photo ? (
                            <img
                                src={form.photo} 
                                alt={form.prompt}
                                className='w-full h-full object-contain'
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="preview"
                                className='w-1/2 h-1/2 object-contain opacity-60'
                            />
                        )}

                        {generatingImg && (
                            <div className='absolute bg-[rgba(0,0,0,0.5)] w-full h-full justify-center items-center flex'>
                                <Loader/>
                            </div>
                        )}

                    </div>

                </div>

                <div className='mt-5'>
                    <button
                        type="button"
                        onClick={generateImage}
                        className='border w-full py-2 text-white bg-green-700 rounded-[12px]'
                    >
                        {generatingImg ? "Generating..." : "Generate" }
                    </button>
                </div>

                <div className='mt-10'>
                    <p className='mt-2'>Once you've generated the image you can share the image with the community</p>
                    <button
                        type="submit" //this button is responsible for submitting the form , invoked handleSubmit 
                        className='w-full mt-3 font-inter font-medium rounded-[12px] border px-4 py-2 bg-[#6469ff] text-white'
                    >
                       {loading ? 'Sharing...' : 'Share with the community'}
                    </button>
                </div>

            </form>
        </section>
        
    )
}

export default CreatePost
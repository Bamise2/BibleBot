# from PIL import Image
# import streamlit as st
# import google.generativeai as genai
# import os

# # setup api key and model
# genai.configure(api_key = 'AIzaSyDZDu89R93ezFGysVLtmnaYV82Ku0Z_WJo')
# model = genai.GenerativeModel('gemini-1.5-flash-002')


# # Streamlit app layout
# st.set_page_config(page_title="BREAD OF LIFE", layout= "wide")
# st.title('BREAD OF LIFE ')
# user_input = st.text_input("How can I can help you today?")

# # Add an image to the top of the page
# #image_path = "/Users/mac/Downloads/pexels-pixabay-209206.jpg"
# #try:
#     #image = Image.open(image_path)

#     #image.verify()
#     #image = Image.open(image_path)
    
#     #st.image(Image, caption="Struggling? Come to Jesus.", use_column_width=True)
# #except FileNotFoundError:
#     #st.error("Image not found. Please check your file path")
# #except Exception as e:
#     #st.error("An error occured while loading: {e}")
    
# # handle user input and generate response

# if user_input != "How can i help you today?":
#     # Customized prompt
#     prompt = f""" you are a christian spiritual assistant. 
#     Your response should be christocentric, provide bible verses, spiritual guidance and encouragement. If the user is in need of comfort provide them bible verses that helps 
#     them focus on the finished work of christ for them,
#       let your response fix their focus on what christ has done for them on the cross.
#     User Input: {user_input }
# """
#     response = model.generate_content(prompt)
#     response_text = response.text

#     # Display the response
#     st.write(response_text)
# else:
#     st.write("Please enter a question or request for spiritual guidance")

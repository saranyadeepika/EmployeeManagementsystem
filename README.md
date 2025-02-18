# **Setup Guide for open_webui_pipelines and React Integration**  

### **Clone the Repository**  
```bash
git clone https://github.com/dealwallet1/open_webui_pipelines.git
cd open_webui_pipelines
```

### **Install Required Packages**  
```bash
pip install -r requirements.txt
```

### **Run the Required Commands**  

1. Start the moderator bot:  
   ```bash
   python -m owc.discord_comp.bot.moderator_bot.py
   ```  
2. Run the setup:  
   ```bash
   python -m owc.discord_comp.setup
   ```  
3. Start the Open WebUI server:  
   ```bash
   open-webui serve
   ```

### **Set Up Environment Variables in Your React Project**  
Navigate to your React project folder and open (or create) a `.env` file. Add the following variables:  

```env
OPENAI_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiMzI3MDFkLTJhYjItNDIxNi1hOTM4LWU1MDc3YjEzN2ExZSJ9.KQY5qPKuenLhHElBJA2VFq8-LuKGajEExkFCL3ukD9Y
OPENAI_BASE_URL="http://localhost:8080/api"
```

### **Run Your React Project**  
Make sure you're inside your React project directory, then run:  
```bash
npm start
```
or  
```bash
yarn start
```

### **Final Steps**  
- Ensure Open WebUI is running and accessible at `http://localhost:8080`.  
- Your React application should now interact with Open WebUI using the provided API key.  

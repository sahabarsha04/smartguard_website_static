// DOM Elements
        const headerLoginBtn = document.getElementById('headerLoginBtn');
        const headerRegisterBtn = document.getElementById('headerRegisterBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const forgotForm = document.getElementById('forgotForm');
        const forgotPassword = document.getElementById('forgotPassword');
        const backToLogin = document.getElementById('backToLogin');
        const authSection = document.getElementById('auth');
        const dashboard = document.getElementById('dashboard');
        const heroSection = document.querySelector('.hero');
        const aboutSection = document.querySelector('.about');
        const updateProfileBtn = document.getElementById('updateProfileBtn');
        const createDatasetBtn = document.getElementById('createDatasetBtn');
        const uploadImagesBtn = document.getElementById('uploadImagesBtn');
        const navLinks = document.querySelectorAll('.nav-link');
        const footerLinks = document.querySelectorAll('.footer-link');
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        const uploadArea = document.getElementById('uploadArea');
        const imageUpload = document.getElementById('imageUpload');
        const datasetSelect = document.getElementById('datasetSelect');
        const datasetsList = document.getElementById('datasetsList');
        const unauthorizedImages = document.getElementById('unauthorizedImages');
        const unauthorizedCount = document.getElementById('unauthorizedCount');

        // Demo data
        let datasets = [];
        let selectedDatasetId = '';
        let selectedFiles = [];

        // Show auth section and specific form
        function showAuthForm(formType) {
            // Show auth section
            authSection.style.display = 'block';
            
            // Hide other sections
            heroSection.style.display = 'none';
            aboutSection.style.display = 'none';
            dashboard.style.display = 'none';
            
            // Update tabs and forms
            authTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === formType) {
                    tab.classList.add('active');
                }
            });
            
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${formType}Form`) {
                    form.classList.add('active');
                }
            });
            
            // Scroll to auth section
            window.scrollTo({
                top: authSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }

        // Show main sections (home, about, etc.)
        function showMainSection(sectionId) {
            // Hide auth and dashboard
            authSection.style.display = 'none';
            dashboard.style.display = 'none';
            
            // Show main sections
            heroSection.style.display = 'block';
            aboutSection.style.display = 'block';
            
            // Scroll to the requested section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }

        // Show dashboard
        function showDashboard() {
            authSection.style.display = 'none';
            heroSection.style.display = 'none';
            aboutSection.style.display = 'none';
            dashboard.style.display = 'block';
            
            // Load demo data
            loadDemoData();
            
            window.scrollTo(0, 0);
        }

        // Load demo data for dashboard
        function loadDemoData() {
            // Demo datasets
            datasets = [
                {
                    id: '1',
                    name: 'John Smith',
                    description: 'Family member',
                    images: [
                        { path: 'https://via.placeholder.com/150/1a73e8/ffffff?text=JS1' },
                        { path: 'https://via.placeholder.com/150/1a73e8/ffffff?text=JS2' }
                    ],
                    createdAt: new Date()
                },
                {
                    id: '2',
                    name: 'Sarah Johnson',
                    description: 'Family member',
                    images: [
                        { path: 'https://via.placeholder.com/150/34a853/ffffff?text=SJ1' }
                    ],
                    createdAt: new Date()
                }
            ];
            
            renderDatasets();
            updateDatasetSelect();
        }

        // Render datasets
        function renderDatasets() {
            datasetsList.innerHTML = '';
            
            if (datasets.length === 0) {
                datasetsList.innerHTML = '<p>No datasets created yet.</p>';
                return;
            }

            datasets.forEach(dataset => {
                const datasetCard = document.createElement('div');
                datasetCard.className = 'dataset-card';
                datasetCard.innerHTML = `
                    <h4>${dataset.name}</h4>
                    <p>${dataset.description || 'No description'}</p>
                    <p><small>Created: ${new Date(dataset.createdAt).toLocaleDateString()}</small></p>
                    <p><small>Images: ${dataset.images.length}</small></p>
                    <div class="dataset-images">
                        ${dataset.images.map(img => 
                            `<img src="${img.path}" alt="${dataset.name}" class="dataset-image">`
                        ).join('')}
                    </div>
                `;
                datasetsList.appendChild(datasetCard);
            });
        }

        // Update dataset select dropdown
        function updateDatasetSelect() {
            datasetSelect.innerHTML = '<option value="">Select a dataset</option>';
            datasets.forEach(dataset => {
                const option = document.createElement('option');
                option.value = dataset.id;
                option.textContent = dataset.name;
                datasetSelect.appendChild(option);
            });
        }

        // Header button event listeners
        headerLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthForm('login');
        });

        headerRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthForm('register');
        });

        // Navigation links event listeners
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                showMainSection(targetId);
            });
        });

        // Footer links event listeners
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                showMainSection(targetId);
            });
        });

        // Switch between auth tabs
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                // Update active tab
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding form
                authForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${tabName}Form`) {
                        form.classList.add('active');
                    }
                });
            });
        });

        // Show forgot password form
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            authForms.forEach(form => form.classList.remove('active'));
            forgotForm.classList.add('active');
            
            // Update tabs
            authTabs.forEach(tab => tab.classList.remove('active'));
        });

        // Back to login from forgot password
        backToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            authForms.forEach(form => form.classList.remove('active'));
            loginForm.classList.add('active');
            
            // Update tabs
            authTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === 'login') {
                    tab.classList.add('active');
                }
            });
        });

        // Login functionality
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation
            if (email && password) {
                // Show dashboard and hide other sections
                showDashboard();
            } else {
                alert('Please fill in all fields');
            }
        });

        // Register functionality
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Simple validation
            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                
                // Show success message and switch to login
                alert('Registration successful! Please login with your credentials.');
                
                // Switch to login tab
                showAuthForm('login');
            } else {
                alert('Please fill in all fields');
            }
        });

        // Forgot password functionality
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            
            if (email) {
                alert('Password reset instructions have been sent to your email.');
                
                // Switch back to login
                backToLogin.click();
            } else {
                alert('Please enter your email');
            }
        });

        // Logout functionality
        logoutBtn.addEventListener('click', () => {
            // Show all sections and hide dashboard
            authSection.style.display = 'none';
            heroSection.style.display = 'block';
            aboutSection.style.display = 'block';
            dashboard.style.display = 'none';
            
            // Scroll to top
            window.scrollTo(0, 0);
        });

        // Update profile
        updateProfileBtn.addEventListener('click', () => {
            const name = document.getElementById('updateName').value;
            const email = document.getElementById('updateEmail').value;
            
            if (name && email) {
                document.getElementById('profileName').textContent = name;
                document.getElementById('profileEmail').textContent = email;
                document.getElementById('userName').textContent = name;
                alert('Profile updated successfully!');
            } else {
                alert('Please fill in all fields');
            }
        });

        // Create dataset
        createDatasetBtn.addEventListener('click', () => {
            const name = document.getElementById('datasetName').value;
            const description = document.getElementById('datasetDesc').value;
            
            if (name) {
                const newDataset = {
                    id: Date.now().toString(),
                    name,
                    description,
                    images: [],
                    createdAt: new Date()
                };
                
                datasets.push(newDataset);
                renderDatasets();
                updateDatasetSelect();
                
                document.getElementById('datasetName').value = '';
                document.getElementById('datasetDesc').value = '';
                
                alert('Dataset created successfully!');
            } else {
                alert('Please enter a dataset name');
            }
        });

        // Upload area functionality
        uploadArea.addEventListener('click', () => {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', (e) => {
            selectedFiles = Array.from(e.target.files);
            if (selectedFiles.length > 0 && selectedDatasetId) {
                uploadImagesBtn.disabled = false;
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle" style="color: var(--success);"></i>
                    <h4>${selectedFiles.length} image(s) selected</h4>
                    <p>Click "Upload Images" to add them to the dataset</p>
                `;
            }
        });

        datasetSelect.addEventListener('change', (e) => {
            selectedDatasetId = e.target.value;
            if (selectedFiles.length > 0 && selectedDatasetId) {
                uploadImagesBtn.disabled = false;
            } else {
                uploadImagesBtn.disabled = true;
            }
        });

        uploadImagesBtn.addEventListener('click', () => {
            if (!selectedDatasetId || selectedFiles.length === 0) {
                alert('Please select a dataset and images to upload');
                return;
            }

            // Find the dataset
            const dataset = datasets.find(d => d.id === selectedDatasetId);
            if (dataset) {
                // Add placeholder images for demo
                selectedFiles.forEach((file, index) => {
                    dataset.images.push({
                        path: `https://via.placeholder.com/150/1a73e8/ffffff?text=IMG${index + 1}`
                    });
                });
                
                renderDatasets();
                
                // Reset upload area
                selectedFiles = [];
                imageUpload.value = '';
                uploadImagesBtn.disabled = true;
                uploadArea.innerHTML = `
                    <i class="fas fa-cloud-upload-alt"></i>
                    <h4>Drop images here or click to browse</h4>
                    <p>Supported formats: JPG, PNG, GIF (Max 5MB each)</p>
                `;
                
                alert('Images uploaded successfully!');
            }
        });

        // Tab functionality
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });

        // Initialize page - show main sections by default
        window.addEventListener('DOMContentLoaded', () => {
            heroSection.style.display = 'block';
            aboutSection.style.display = 'block';
            authSection.style.display = 'none';
            dashboard.style.display = 'none';
        });
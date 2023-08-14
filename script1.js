const tree = {
         name: 'root',
         children: [
           {
             name: 'child1',
             children: [
               { name: 'child1-child1', data: "c1-c1 Hello" },
               { name: 'child1-child2', data: "c1-c2 JS" }
             ]
           },
           { name: 'child2', data: "c2 World" }
         ]
       };
       
       // Recursive function to create the TagView
       function createTagView(tag) {
         const tagDiv = document.createElement('div');
         tagDiv.classList.add('tag');
       
         const headerDiv = document.createElement('div');
         headerDiv.classList.add('tag-header');
       
         const collapseButton = document.createElement('button');
         collapseButton.innerHTML = 'v';
         collapseButton.classList.add('collapse-btn');
         collapseButton.addEventListener('click', () => toggleCollapse(tagDiv));
       
         const nameInput = document.createElement('input');
         nameInput.value = tag.name;
         nameInput.classList.add('tag-name');
         nameInput.addEventListener('change', () => updateTagName(tag, nameInput.value));
       
         headerDiv.appendChild(collapseButton);
         headerDiv.appendChild(nameInput);
       
         if (tag.children) {
           const addButton = document.createElement('button');
           addButton.innerHTML = 'Add Child';
           addButton.classList.add('add-btn');
           addButton.addEventListener('click', () => addChild(tag));
           headerDiv.appendChild(addButton);
       
           const childrenDiv = document.createElement('div');
           childrenDiv.classList.add('children');
       
           tag.children.forEach(child => {
             const childTag = createTagView(child);
             childrenDiv.appendChild(childTag);
           });
       
           tagDiv.appendChild(headerDiv);
           tagDiv.appendChild(childrenDiv);
         } else if (tag.data !== undefined) {
           const dataInput = document.createElement('input');
           dataInput.value = tag.data;
           dataInput.classList.add('tag-data');
           dataInput.addEventListener('change', () => updateTagData(tag, dataInput.value));
       
           tagDiv.appendChild(headerDiv);
           tagDiv.appendChild(dataInput);
         }
       
         return tagDiv;
       }
       
       // Toggle collapse state
       function toggleCollapse(tagDiv) {
         const collapseButton = tagDiv.querySelector('.collapse-btn');
         const childrenDiv = tagDiv.querySelector('.children');
         const isOpen = childrenDiv.style.display !== 'none';
       
         childrenDiv.style.display = isOpen ? 'none' : 'block';
         collapseButton.innerHTML = isOpen ? '>' : 'v';
       }
       
       // Update tag name
       function updateTagName(tag, newName) {
         tag.name = newName;
       }
       
       // Update tag data
       function updateTagData(tag, newData) {
         tag.data = newData;
       }
       
       // Add child to a tag
       function addChild(parentTag) {
         if (!parentTag.children) {
           parentTag.children = [];
         }
       
         const newChild = {
           name: 'New Child',
           data: 'Data'
         };
       
         parentTag.children.push(newChild);
         renderTagView();
       }
       
       // Render the tag view
       function renderTagView() {
         const tagView = document.getElementById('tagView');
         tagView.innerHTML = '';
         const rootTag = createTagView(tree);
         tagView.appendChild(rootTag);
       }
       
       // Export button click event
       document.getElementById('exportButton').addEventListener('click', () => {
         const exportedData = JSON.stringify(tree, ['name', 'children', 'data'], 2);
         console.log(exportedData); 
       });
       
       // Initial rendering
       renderTagView();
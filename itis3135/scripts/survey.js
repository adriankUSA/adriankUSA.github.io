//hi
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intro-form");
    
    // add course button
    document.getElementById("add-course").addEventListener("click", () => {
        const coursesSection = document.getElementById("courses-section");
      // new wrapper div
        const wrapper = document.createElement("div"); 
        wrapper.className = "course-wrapper"; 
      
        const input = document.createElement("input");
        input.type = "text";
        input.className = "course";
        input.placeholder = "Enter course name";
        input.required = true;
      
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            // removes input, button, and line break together
          wrapper.remove(); 
        });
      
        wrapper.appendChild(input);
        wrapper.appendChild(delBtn);
        wrapper.appendChild(document.createElement("br")); 
      
        coursesSection.appendChild(wrapper);
      });

      const preloadCourses = ["ITIS 3135 - Web-Based Application Design and Development: I want more HTML, CSS, and JS practice!",
        "ITSC 3990 - Undergraduate Research: It sounds really fun, and perhaps my research can make a difference.",
        "ITCS 4114 - Real World Algorithms: 2214 was too easy and I want to learn more about data structures and algorithms.", 
        "ITSC 2181 - Introduction to Computer Systems: Required class but I am genuinely interested.", 
        "ITCS 3155 - Software Engineering: Required class, but also great practice."];
    const addCourseButton = document.getElementById("add-course");

    preloadCourses.forEach((courseName) => {
        addCourseButton.click(); 
        const newInputs = document.querySelectorAll(".course");
        const latestInput = newInputs[newInputs.length - 1];
        latestInput.value = courseName;
    });
      
  
    // submit handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // get all values
      const name = document.getElementById("name").value.trim();
      const mascot = document.getElementById("mascot").value.trim();
      const image = document.getElementById("image").files[0];
      const caption = document.getElementById("caption").value.trim();
      const personal = document.getElementById("personal").value.trim();
      const professional = document.getElementById("professional").value.trim();
      const academic = document.getElementById("academic").value.trim();
      const webdev = document.getElementById("webdevbackground").value.trim();
      const platform = document.getElementById("platform").value.trim();
      const funny = document.getElementById("funny").value.trim();
      const anything = document.getElementById("anything").value.trim();
      const agreement = document.getElementById("agreement").checked;
  
      // validate
      if (
        !name || !mascot || !image || !caption || !personal || !professional ||
        !academic || !webdev || !platform || !funny || !anything || !agreement
      ) {
        alert("Please fill out all fields and check the agreement.");
        return;
      }
  
      // Courses
      const courseInputs = document.querySelectorAll(".course");
      const courses = [];
      courseInputs.forEach((input) => {
        if (input.value.trim()) courses.push(input.value.trim());
      });
  
      console.log("Collected Data:", {
        name, mascot, image, caption, personal, professional,
        academic, webdev, platform, funny, anything, agreement, courses
      });
  
      // hide form and build intro
      // hide form
        form.style.display = "none";

        // create output div
        const output = document.createElement("div");
        output.id = "intro-output";

        // name and mascot
        const heading = document.createElement("h2");
        heading.textContent = `${name} the ${mascot}`;
        output.appendChild(heading);

        // img and caption
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = URL.createObjectURL(image);
        img.alt = `${name}'s image`;
        img.style.maxWidth = "300px";

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = caption;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        output.appendChild(figure);

        // background sections
        const infoList = document.createElement("ul");

        const makeLI = (label, text) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${label}:</strong> ${text}`;
        return li;
        };

        infoList.appendChild(makeLI("Personal Background", personal));
        infoList.appendChild(makeLI("Professional Background", professional));
        infoList.appendChild(makeLI("Academic Background", academic));
        infoList.appendChild(makeLI("Web Dev Background", webdev));
        infoList.appendChild(makeLI("Primary Computer Platform", platform));
        output.appendChild(infoList);

        // courses
        if (courses.length > 0) {
        const courseHeader = document.createElement("h3");
        courseHeader.textContent = "Courses:";
        output.appendChild(courseHeader);

        const courseList = document.createElement("ul");
        courses.forEach((course) => {
            const li = document.createElement("li");
            li.textContent = course;
            courseList.appendChild(li);
        });
        output.appendChild(courseList);
        }

        // funny and extra sections
        output.appendChild(makeLI("Funny Thing", funny));
        output.appendChild(makeLI("Anything Else", anything));

        // reset button
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Reset and Try Again";
        resetBtn.addEventListener("click", () => {
            // remove output
            output.remove();
          
            // reset the form fields
            form.reset();
          
            // clear pre-filled input values manually by id
            [
              "name", "mascot", "caption", "personal", "professional",
              "academic", "webdevbackground", "platform", "funny", "anything"
            ].forEach((id) => {
              const el = document.getElementById(id);
              if (el) el.value = "";
            });
          
            // uncheck checkbox manually
            document.getElementById("agreement").checked = false;
          
            // remove all dynamically added course inputs
            document.querySelectorAll(".course-wrapper").forEach((wrapper) => wrapper.remove());
          
            // clear image preview
            document.getElementById("loadImage").innerHTML = "";
          
            // show the form again
            form.style.display = "block";
          });
          
        output.appendChild(document.createElement("br"));
        output.appendChild(resetBtn);

        // append output to main
        document.querySelector("main").appendChild(output);

    });

    

  });

  function loadImage() {
    const image = document.getElementById('image').files[0];

    if (image) {
        const imageURL = URL.createObjectURL(image);
        const imgTag = `<img src="${imageURL}" alt="Preview" style="max-width: 300px;">`;
        document.getElementById('loadImage').innerHTML = imgTag;
    }
}
  
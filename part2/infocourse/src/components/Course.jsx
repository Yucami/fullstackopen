const Header = ({ courses }) => {
    // console.log(course);
    return <h1>{courses.name}</h1>;
  };
  
  const Part = ({ part }) => {
    // console.log(part);
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    console.log(parts);
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };
  
  const Total = ({ parts }) => {
    return (
      <h3>
        total of {" "}
        {parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0)}
        {" "} exercises
      </h3>
    )
  }
  
  const Course = ({ courses }) => {
    // console.log(course); 
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <Header courses={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    );
  };

  export default Course;
 class Genre {
   readonly genreid: number;
   readonly name: string;
   readonly description: string;

  constructor(genreid: number, name: string, description: string) {
      const errors: string[] = [];
      this.genreid = genreid;
      if (name.length < 3) {
          errors.push("Name must be at least 3 character long");
      }
      if (description.length < 4){
            errors.push("Description must be at least 4 characters long");
      }
      if (errors.length > 0) {
          throw new Error(errors.join(":"));
      }
      this.name = name;
      this.description = description;
  }





 }
export { Genre };

import z from 'zod'

const movieSchema = z.object({
   title: z.string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Please add the title'
   }).min(2, { message: 'Please add the title' }),
   releaseYear: z.number().int().min(1900, { message: 'Please add the release year' }).max(new Date().getFullYear()),
   genre: z.enum(['action', 'science fiction', 'adventure', 'crime', 'drama', 'action'], {
      errorMap: (issue, _ctx) => {
         switch (issue.code) {
            case 'invalid_enum_value':
               return { message: 'Please select a valid genre' };
            default:
               return { message: 'Genre not accepted' };
         }
      },
   }),
   director: z.string().min(1, { message: 'Please add the director' }),
   duration: z.number().positive().min(1, { message: 'Please add the duration' }),
   rating: z.number({ required_error: 'Please add de rate', invalid_type_error: 'Invalid rate' }).int().min(0).max(10).default(0)
})

export function validateMovie(obj) {
   return movieSchema.parseAsync(obj)
}

export function validatePartialMovie(input) {
   return movieSchema.partial().parseAsync(input)
}

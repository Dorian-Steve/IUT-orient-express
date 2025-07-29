// // src/hooks/useClerkSupabase.ts
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { useAuth } from '@clerk/nextjs';
// import { useMemo } from 'react';

// export function useClerkSupabase(): SupabaseClient | null {
//   const { getToken } = useAuth();

//   const supabase = useMemo(() => {
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//     if (!supabaseUrl || !supabaseAnonKey) {
//       console.error('Missing Supabase environment variables');
//       return null;
//     }

//     return createClient(supabaseUrl, supabaseAnonKey, {
//       global: {
//         fetch: async (url, options = {}) => {
//           try {
//             const clerkToken = await getToken({
//               template: 'supabase',
//             });

//             const headers = new Headers(options?.headers);
//             if (clerkToken) {
//               headers.set('Authorization', `Bearer ${clerkToken}`);
//             }

//             return fetch(url, {
//               ...options,
//               headers,
//             });
//           } catch (error) {
//             console.error('Error getting Clerk token:', error);
//             // Fallback to regular fetch without token
//             return fetch(url, options);
//           }
//         },
//       },
//     });
//   }, [getToken]);

//   return supabase;
// }

// Usage example:
// const supabase = useClerkSupabase();
// if (supabase) {
//   const { data, error } = await supabase.from('your_table').select('*');
// }
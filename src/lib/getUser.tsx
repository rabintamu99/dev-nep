
  export default async function getUser(username: string) {
    const res = await fetch(`http://localhost:3000/api/users/${username}`)

    if(!res.ok){
        throw new Error('User not found')
      }
    return res.json()
  }
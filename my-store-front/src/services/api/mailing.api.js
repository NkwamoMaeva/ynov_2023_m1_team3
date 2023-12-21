export async function sendEmail(mail) {
    try {
        const res = await fetch(`${process.env.BACKEND_NESTJS_URL}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mail),
            });
        if (res.ok) {
            console.log('E-mail envoyé avec succès!');
        } else {
            console.error('Erreur lors de l\'envoi de l\'e-mail caramba- Statut:', response.status);
            const errorText = await response.text();
            console.error('Message d\'erreur:', errorText);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail', error);
    }
}

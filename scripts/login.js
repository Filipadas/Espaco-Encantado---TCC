document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const erroMsg = document.getElementById('erro');

    // Validação simples (usuário de exemplo: admin@example.com / 123456)
    if (email === 'admin@example.com' && senha === '123456') {
        // Login bem-sucedido
        alert('Login realizado com sucesso!');
        erroMsg.style.display = 'none';
        // Você pode redirecionar para outra página aqui
        // window.location.href = '/dashboard';
    } else {
        // Credenciais inválidas
        erroMsg.style.display = 'block';
        document.getElementById('senha').value = '';
    }
});

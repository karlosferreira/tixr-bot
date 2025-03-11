import robot from "robotjs";
import { exec } from "child_process";
import clipboard from "clipboardy";

// Função para simular digitação
const typeString = (text) => {
    for (let char of text) {
        if (/[a-z]/.test(char)) {
            // Letras minúsculas, digitar diretamente
            robot.keyTap(char);
        } else if (/[A-Z]/.test(char)) {
            // Letras maiúsculas, pressionar Shift
            robot.keyToggle('shift', 'down');
            robot.keyTap(char.toLowerCase()); // Convertendo para minúscula para digitar corretamente
            robot.keyToggle('shift', 'up');
        } else if (/[0-9]/.test(char)) {
            // Números, digitar diretamente
            robot.keyTap(char);
        } else if (char === '@') {
            // @ é digitado com Shift + 2
            robot.keyTap('2', ['shift']);
        } else if (char === '.') {
            // Ponto (.) é digitado sem Shift
            robot.keyTap('.');
        } else if (char === '-') {
            // Hífen (-) é digitado sem Shift
            robot.keyTap('-');
        } else if (char === 'ã') {
            robot.keyTap('backquote', ['shift']);
            robot.keyTap('a');
        } else {
            // Caracteres especiais podem ser tratados com Shift
            robot.keyTap(char, ['shift']);
        }
    }
};

// Abrir o Chrome e acessar a página da Tixr
console.log("Abrindo o Google Chrome...");
exec('google-chrome --new-window "https://www.tixr.com"', (error) => {
    if (error) {
        console.error("Erro ao abrir o Chrome:", error);
        return;
    }

    console.log("Chrome aberto. Aguardando carregamento...");

    setTimeout(() => {
        console.log("Focando na janela do Chrome...");

        // Simular um clique na janela do Chrome para garantir o foco
        const screenSize = robot.getScreenSize();
        const x = screenSize.width / 2;
        const y = screenSize.height / 4;

        robot.moveMouse(x, y);
        // robot.mouseClick(); // Clica na janela para ativá-la

        setTimeout(() => {
            console.log("Abrindo o console do desenvolvedor...");

            // Simular Ctrl + Shift + J para abrir o console
            robot.keyToggle("control", "down");
            robot.keyToggle("shift", "down");
            robot.keyTap("j");
            robot.keyToggle("control", "up");
            robot.keyToggle("shift", "up");

            setTimeout(() => {
                // Script JavaScript para abrir o modal de login
                const openLoginScript = `
                    setTimeout(() => {
                        let loginButton = document.querySelector('li.login a');
                        if (loginButton) {
                            loginButton.click();
                            console.log("Botão de login clicado!");
                        } else {
                            console.error("Botão de login não encontrado!");
                        }
                    }, 3000);
                `;

                // Copiar para a área de transferência
                clipboard.writeSync(openLoginScript);
                console.log("Script copiado para abrir o modal!");

                // Colar e executar no console do Chrome
                setTimeout(() => {
                    robot.keyTap("v", ["control"]); // Cola o script
                    robot.keyTap("enter"); // Executa o script
                }, 1000);

                // Esperar um tempo para o modal abrir
                setTimeout(() => {
                    console.log("Fechando o console do desenvolvedor...");

                    // Simular Ctrl + Shift + J para FECHAR o console
                    robot.keyToggle("control", "down");
                    robot.keyToggle("shift", "down");
                    robot.keyTap("j");
                    robot.keyToggle("control", "up");
                    robot.keyToggle("shift", "up");

                    setTimeout(() => {
                        console.log("Voltando para a aba do site...");

                        // Simular clique na aba do site para garantir o foco
                        robot.moveMouse(x, y);
                        robot.mouseClick();

                        setTimeout(() => {
                            console.log("Reabrindo o console para interagir com os campos...");

                            // Reabrir o console para executar os próximos passos
                            robot.keyToggle("control", "down");
                            robot.keyToggle("shift", "down");
                            robot.keyTap("j");
                            robot.keyToggle("control", "up");
                            robot.keyToggle("shift", "up");

                            setTimeout(() => {
                                // Script para clicar no campo de e-mail e garantir que o campo receba o foco
                                const fillFormScript = `
                                setTimeout(() => {
                                    // Passo 1: Preencher o campo de e-mail
                                    let emailInput = document.querySelector('form[name="login-form"] input[type="text"]');
                                    
                                    if (emailInput) {
                                        // Limpar o campo de e-mail antes de colar o valor
                                        emailInput.value = "";
                                        emailInput.focus();
                                        emailInput.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                                        
                                        // Colar o e-mail diretamente
                                        const email = "wiliancesarvicente@gmail.com";
                                        clipboard.writeSync(email); // Colar o e-mail na área de transferência
                                        robot.keyTap("v", ["control"]); // Colar o e-mail
                            
                                        console.log("E-mail colado!");
                            
                                        // Simular espaço e backspace para ativar a validação do front-end
                                        setTimeout(() => {
                                            robot.keyTap("space");  // Simula pressionamento da tecla 'espaço'
                                            robot.keyTap("backspace"); // Simula pressionamento da tecla 'backspace'
                                            console.log("Validação do front-end ativada no campo de e-mail!");
                                        }, 1000); // Esperar 1 segundo antes de simular as teclas
                            
                                        // Passo 2: Fechar o console do desenvolvedor após preencher o e-mail
                                        setTimeout(() => {
                                            robot.keyToggle("control", "down");
                                            robot.keyToggle("shift", "down");
                                            robot.keyTap("j"); // Fecha o console
                                            robot.keyToggle("control", "up");
                                            robot.keyToggle("shift", "up");
                            
                                            console.log("Console fechado após preencher o e-mail.");
                            
                                            // Passo 3: Abrir o console novamente para preencher a senha
                                            setTimeout(() => {
                                                robot.keyToggle("control", "down");
                                                robot.keyToggle("shift", "down");
                                                robot.keyTap("j"); // Abre o console novamente
                                                robot.keyToggle("control", "up");
                                                robot.keyToggle("shift", "up");
                            
                                                console.log("Console reaberto para preencher a senha.");
                            
                                                // Passo 4: Preencher o campo de senha
                                                let passwordInput = document.querySelector('form[name="login-form"] input[type="password"]');
                                                
                                                if (passwordInput) {
                                                    // Limpar o campo de senha antes de colar o valor
                                                    passwordInput.value = "";
                                                    passwordInput.focus();
                                                    passwordInput.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                            
                                                    // Colar a senha diretamente
                                                    const password = "Ccedilha99will";
                                                    clipboard.writeSync(password); // Colar a senha na área de transferência
                                                    robot.keyTap("v", ["control"]); // Colar a senha
                            
                                                    console.log("Senha colada!");
                            
                                                    // Passo 5: Fechar o console novamente após preencher a senha
                                                    setTimeout(() => {
                                                        robot.keyToggle("control", "down");
                                                        robot.keyToggle("shift", "down");
                                                        robot.keyTap("j"); // Fecha o console
                                                        robot.keyToggle("control", "up");
                                                        robot.keyToggle("shift", "up");
                            
                                                        console.log("Console fechado após preencher a senha.");
                                                    }, 1000); // Esperar 1 segundo antes de fechar o console
                                                } else {
                                                    console.error("Erro ao encontrar o campo de senha!");
                                                }
                                            }, 2000); // Aguardar 2 segundos antes de abrir o console novamente
                                        }, 3000); // Esperar 3 segundos antes de fechar o console após preencher o e-mail
                                    } else {
                                        console.error("Erro ao encontrar o campo de e-mail!");
                                    }
                                }, 5000); // Aguarda 5 segundos para garantir que a página tenha carregado
                            `;

                                // Copiar o script para a área de transferência
                                clipboard.writeSync(fillFormScript);
                                console.log("Script copiado para preencher os campos!");

                                setTimeout(() => {
                                    robot.keyTap("v", ["control"]); // Cola o script
                                    robot.keyTap("enter"); // Executa o script
                                }, 1000);

                                // Fechar o console após o clique para permitir digitação
                                setTimeout(() => {
                                    console.log("Fechando o console após o clique nos campos...");

                                    robot.keyToggle("control", "down");
                                    robot.keyToggle("shift", "down");
                                    robot.keyTap("j");
                                    robot.keyToggle("control", "up");
                                    robot.keyToggle("shift", "up");

                                    // Espera para garantir que os campos estão focados
                                    setTimeout(() => {
                                        console.log("Digitando o e-mail...");
                                        typeString("wiliancesarvicente@gmail.com"); // Digitar o e-mail
                                        robot.keyTap("tab");
                                        // Esperar antes de digitar a senha
                                        setTimeout(() => {
                                            console.log("Digitando a senha...");
                                            typeString("Ccedilha99will"); // Digitar a senha
                                            setTimeout(() => {
                                                robot.keyTap("enter");

                                                setTimeout(() => {

                                                    robot.keyToggle("control", "down");
                                                    robot.keyToggle("shift", "down");
                                                    robot.keyTap("j");
                                                    robot.keyToggle("control", "up");
                                                    robot.keyToggle("shift", "up");

                                                    // Script JavaScript para abrir o search
                                                    const openSearchScript = `
                                                        setTimeout(() => {
                                                            // Clica no botão de pesquisa
                                                            let searchButton = document.querySelector('ul.links.links-right li a[action="search"]');
                                                            if (searchButton) {
                                                                searchButton.click();
                                                                console.log("Botão de search clicado!");
                                                    
                                                                // Esperar o campo de pesquisa aparecer
                                                                setTimeout(() => {
                                                                    // Seleciona o campo de pesquisa e digita 'craft'
                                                                    let searchInput = document.querySelector('.search input[type="text"]');
                                                                    if (searchInput) {
                                                                        searchInput.focus(); // Foca no campo de pesquisa
                                                                    } else {
                                                                        console.error("Campo de pesquisa não encontrado!");
                                                                    }
                                                                }, 2000); // Aguarda 1 segundo para garantir que o campo de pesquisa está visível
                                                            } else {
                                                                console.error("Botão de search não encontrado!");
                                                            }
                                                        }, 3000); // Aguarda 3 segundos para o botão de pesquisa estar disponível
                                                    `;

                                                    // Copiar para a área de transferência
                                                    clipboard.writeSync(openSearchScript);
                                                    console.log("Script copiado para abrir o search e digitar 'craft'!");

                                                    // Colar e executar no console do Chrome
                                                    setTimeout(() => {
                                                        robot.keyTap("v", ["control"]); // Cola o script
                                                        robot.keyTap("enter"); // Executa o script

                                                        robot.keyToggle("control", "down");
                                                        robot.keyToggle("shift", "down");
                                                        robot.keyTap("j");
                                                        robot.keyToggle("control", "up");
                                                        robot.keyToggle("shift", "up");

                                                        setTimeout(() => {
                                                            typeString("Warcraft 30th Anniversary World Tour - S");

                                                            setTimeout(() => {
                                                                robot.keyToggle("control", "down");
                                                                robot.keyToggle("shift", "down");
                                                                robot.keyTap("j");
                                                                robot.keyToggle("control", "up");
                                                                robot.keyToggle("shift", "up");

                                                                setTimeout(() => {
                                                                    const openEventLink = `
                                                                        setTimeout(() => {
                                                                            // Verifica se a lista de eventos está vazia
                                                                            let eventList = document.querySelector('ul.event-list');
                                                                            if (eventList) {
                                                                                let eventItems = eventList.querySelectorAll('li a');
                                                                                if (eventItems.length === 0) {
                                                                                    console.log("A lista de eventos está vazia!");
                                                                                } else {
                                                                                    // Clica no primeiro elemento encontrado
                                                                                    eventItems[1].click();
                                                                                    console.log("Primeiro evento clicado!");
                                                                                }
                                                                            } else {
                                                                                console.error("Lista de eventos não encontrada!");
                                                                            }
                                                                        }, 3000);                                                                    
                                                                    `;

                                                                    // Copiar para a área de transferência
                                                                    clipboard.writeSync(openEventLink);
                                                                    console.log("Script copiado para abrir o link do evento");

                                                                    setTimeout(() => {
                                                                        robot.keyTap("v", ["control"]); // Cola o script
                                                                        robot.keyTap("enter"); // Executa o script

                                                                        robot.keyToggle("control", "down");
                                                                        robot.keyToggle("shift", "down");
                                                                        robot.keyTap("j");
                                                                        robot.keyToggle("control", "up");
                                                                        robot.keyToggle("shift", "up");

                                                                        setTimeout(() => {

                                                                            robot.keyToggle("control", "down");
                                                                            robot.keyToggle("shift", "down");
                                                                            robot.keyTap("j");
                                                                            robot.keyToggle("control", "up");
                                                                            robot.keyToggle("shift", "up");

                                                                            const enterToOrder = `setTimeout(() => {
                                                                                let carouselContainer = document.querySelector('.carousels');
                                                                            
                                                                                if (!carouselContainer) {
                                                                                    console.log("Nenhum carrossel encontrado!");
                                                                                    return;
                                                                                }
                                                                            
                                                                                let firstMoreInfoLink = carouselContainer.querySelector('a.more-info');
                                                                            
                                                                                if (firstMoreInfoLink) {
                                                                                    firstMoreInfoLink.click();
                                                                                    console.log("Primeiro link 'More Info' clicado!");
                                                                                } else {
                                                                                    console.error("Nenhum link 'More Info' encontrado dentro do carrossel!");
                                                                                }
                                                                            }, 5000)`; // Aguarda 3 segundos                                                                            

                                                                            clipboard.writeSync(enterToOrder);
                                                                            console.log("Script copiado para abrir o link do evento");

                                                                            
                                                                            setTimeout(() => {
                                                                                robot.keyTap("v", ["control"]); // Cola o script
                                                                                robot.keyTap("enter"); // Executa o script

                                                                                
                                                                                setTimeout(() => {

                                                                                    robot.keyToggle("control", "down");
                                                                                    robot.keyToggle("shift", "down");
                                                                                    robot.keyTap("j");
                                                                                    robot.keyToggle("control", "up");
                                                                                    robot.keyToggle("shift", "up");
                                                                                    
                                                                                    const checkOrderExists = `const socket = new WebSocket("ws://localhost:8080");

                                                                                    socket.onopen = () => {
                                                                                        console.log("✅ Conectado ao WebSocket do Node.js");
                                                                                    
                                                                                        setTimeout(() => {
                                                                                            let formCheck = document.querySelector('.price-content');
                                                                                    
                                                                                            if (!formCheck || !formCheck.innerHTML.trim()) {
                                                                                                console.log("Nenhum formulário encontrado ainda!");
                                                                                                return;
                                                                                            } 
                                                                                    
                                                                                            console.log("🔹 Formulário detectado. Enviando alerta...");
                                                                                    
                                                                                            socket.send(JSON.stringify({
                                                                                                url: window.location.href,
                                                                                                msg: "Formulário de checkout detectado!"
                                                                                            }));
                                                                                    
                                                                                            socket.onmessage = (event) => {
                                                                                                console.log("📩 Resposta do servidor:", event.data);
                                                                                            };
                                                                                        }, 5000);
                                                                                    };`;
                                                                                    
                                                                                    clipboard.writeSync(checkOrderExists);

                                                                                    console.log("✅ Script copiado para verificar se a venda já começou!");                                                                                    
                                                                                    
                                                                                    setTimeout(() => {
                                                                                        robot.keyToggle("control", "down");
                                                                                        robot.keyToggle("shift", "down");
                                                                                        robot.keyTap("j");
                                                                                        robot.keyToggle("control", "up");
                                                                                        robot.keyToggle("shift", "up");
                                                                                        
                                                                                        setTimeout(() => {
                                                                                            robot.keyTap("v", ["control"]); // Cola o script
                                                                                            robot.keyTap("enter"); // Executa o script
                                                                                            
                                                                                            setTimeout(() => {
                                                                                                robot.keyToggle("control", "down");
                                                                                                robot.keyToggle("shift", "down");
                                                                                                robot.keyTap("j");
                                                                                                robot.keyToggle("control", "up");
                                                                                                robot.keyToggle("shift", "up");
                                                                                                
                                                                                                setTimeout(() => {
                                                                                                    const clickLogout = `setTimeout(() => {
                                                                                                        let logoutButton = document.querySelector("a.logged-in.logout.link");
                                                                                                    
                                                                                                        if (!logoutButton) {
                                                                                                            console.log("❌ Botão de logout não encontrado!");
                                                                                                            return;
                                                                                                        } 
                                                                                                    
                                                                                                        console.log("✅ Botão de logout encontrado! Clicando...");
                                                                                                        logoutButton.click();
                                                                                                    }, 2000);`;
                                                                                                    
                                                                                                    clipboard.writeSync(clickLogout);
                                                                                                    console.log("✅ Script copiado para clicar no botão de logout!");
                                                                                                                         
                                                                                                    robot.keyToggle("control", "down");
                                                                                                    robot.keyToggle("shift", "down");
                                                                                                    robot.keyTap("j");
                                                                                                    robot.keyToggle("control", "up");
                                                                                                    robot.keyToggle("shift", "up");
                                                                                                    
                                                                                                    setTimeout(() => {
                                                                                                        robot.keyTap("v", ["control"]);
                                                                                                        robot.keyTap("enter");                                                                                                                    
                                                                                                    
                                                                                                        setTimeout(() => {
                                                                                                            console.log("🛑 Fechando o navegador...");
                                                                                                            robot.keyTap("f4", ["alt"]);
                                                                                                        }, 3000);

                                                                                                    }, 3000);

                                                                                                }, 3000);
                                                                                                
                                                                                            }, 3000);

                                                                                        }, 3000);
                                                                                        
                                                                                    }, 3000);
                                                                                    
                                                                                }, 3000);
                                                                                





                                                                            }, 3000);


                                                                        }, 3000);

                                                                    }, 3000);

                                                                }, 3000);

                                                            }, 3000);

                                                        }, 6000);

                                                    }, 3000);



                                                }, 4000);
                                            }, 4000);
                                        }, 3000);
                                    }, 6000);
                                }, 3000);
                            }, 3000);
                        }, 3000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 5000);
});

﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Repositories;
using webapi.event_.ViewModels;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }


        [HttpPost]
        public IActionResult Login(LoginViewModel usuario, bool isGoogleLogin = false)
        {
            try
            {
                //busca usuário por email e senha ou por email e id da conta google, caso esteja logando com o goole
                Usuario usuarioBuscado = !isGoogleLogin ? _usuarioRepository.BuscarPorEmailESenha(usuario.Email!, usuario.Senha!) ?? throw new Exception("Usuário não encontrado!") : _usuarioRepository.BuscarPorEmailEGoogleId(usuario.Email!, usuario.GoogleIdAccount!) ?? throw new Exception("Usuário google não encontrado!");


                //caso encontre, prossegue para a criação do token

                //informações que serão fornecidas no token
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email!),
                    new Claim(JwtRegisteredClaimNames.Name,usuarioBuscado.Nome!),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                //new Claim(ClaimTypes.Role, usuarioBuscado.TipoUsuario!.Titulo!)
                    new Claim("role", usuarioBuscado.TipoUsuario!.Titulo!),
                };

                //chave de segurança
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("event-webapi-chave-autenticacao-ef"));

                //credenciais
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                //token
                var meuToken = new JwtSecurityToken(
                        issuer: "webapi.event+",
                        audience: "webapi.event+",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}

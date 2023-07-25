package com.ssafy.tati.auth;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        if (optionalMember.isPresent()) {
            return new MemberDetails(optionalMember.get());
        }
        throw new UsernameNotFoundException("이용자를 찾을 수 없습니다.");
    }
}
